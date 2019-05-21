// ==UserScript==
// @name           Tiberium Alliances The Movement
// @version        1.0.4
// @namespace      https://openuserjs.org/users/petui
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @author         petui modified by Debitosphere
// @description    Strategical territory simulator
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @updateURL      https://openuserjs.org/meta/petui/Tiberium_Alliances_The_Movement.meta.js
// ==/UserScript==

(function() {
	var main = function() {
		'use strict';

		function createTheMovement() {
			console.log('TheMovement loaded');

			qx.Class.define('TheMovement', {
				type: 'singleton',
				extend: Object,
				members: {
					entrypoints: [],
					actions: [],

					/**
					 * @param {TheMovement.Entrypoint.Interface} entrypoint
					 */
					registerEntrypoint: function(entrypoint) {
						qx.core.Assert.assertInterface(entrypoint, TheMovement.Entrypoint.Interface);

						this.entrypoints.push(entrypoint);

						for (var i = 0; i < this.actions.length; i++) {
							entrypoint.addAction(this.actions[i]);
						}
					},

					/**
					 * @param {TheMovement.Action.Interface} action
					 */
					registerAction: function(action) {
						qx.core.Assert.assertInterface(action, TheMovement.Action.Interface);

						this.actions.push(action);

						for (var i = 0; i < this.entrypoints.length; i++) {
							this.entrypoints[i].addAction(action);
						}
					}
				}
			});

			qx.Interface.define('TheMovement.Entrypoint.Interface', {
				members: {
					/**
					 * @param {TheMovement.Action.Interface} action
					 * @returns {Number}
					 */
					addAction: function(action) {
						this.assertInterface(action, TheMovement.Action.Interface);
					},

					/**
					 * @param {TheMovement.Action.Interface} action
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 */
					execute: function(action, regionObject) {
						this.assertInterface(action, TheMovement.Action.Interface);
						this.assertInstance(regionObject, ClientLib.Vis.Region.RegionObject);
					},

					/**
					 * @param {TheMovement.Action.Interface} action
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @param {Object} undoDetails
					 */
					onExecution: function(action, regionObject, undoDetails) {
						this.assertInterface(action, TheMovement.Action.Interface);
						this.assertInstance(regionObject, ClientLib.Vis.Region.RegionObject);
						this.assertInstance(undoDetails, Object);
					}
				}
			});

			qx.Class.define('TheMovement.Entrypoint.Abstract', {
				type: 'abstract',
				extend: Object,
				implement: [TheMovement.Entrypoint.Interface],
				construct: function(history) {
					this.history = history;
					this.actions = {};
				},
				members: {
					actions: null,
					history: null,
					actionCount: 0,

					/**
					 * @param {TheMovement.Action.Interface} action
					 * @returns {Number}
					 */
					addAction: function(action) {
						this.actions[this.actionCount] = action;
						return this.actionCount++;
					},

					/**
					 * @param {TheMovement.Action.Interface} action
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 */
					execute: function(action, regionObject) {
						var undoDetails = action.execute(regionObject, this);

						if (!qx.Class.hasInterface(action.constructor, TheMovement.Action.IndirectExecutionInterface)) {
							this.onExecution(action, regionObject, undoDetails);
						}
					},

					/**
					 * @param {TheMovement.Action.Interface} action
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @param {Object} undoDetails
					 */
					onExecution: function(action, regionObject, undoDetails) {
						for (var i in this.actions) {
							if (qx.Class.hasInterface(this.actions[i].constructor, TheMovement.Action.ObserverInterface)) {
								this.actions[i].onActionExecute(action, regionObject);
							}
						}

						this.history.push(action, undoDetails);
					}
				}
			});

			qx.Class.define('TheMovement.Entrypoint.RegionMenu', {
				extend: TheMovement.Entrypoint.Abstract,
				construct: function(history) {
					TheMovement.Entrypoint.Abstract.call(this, history);

					this.selectedObjectMemberName = webfrontend.gui.region.RegionCityMenu.prototype.onTick.toString()
						.match(/if\(this\.([A-Za-z0-9_]+)!==null\)this\.[A-Za-z0-9_]+\(\);/)[1];

					this.actionButtons = {};
					this.blankMenu = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({
						padding: 2
					});

					webfrontend.gui.region.RegionCityMenu.getInstance().addListener('appear', this.__onRegionCityMenuAppear, this);
				},
				members: {
					actionButtons: null,
					blankMenu: null,

					selectedObjectMemberName: null,

					/**
					 * @param {TheMovement.Action.Interface} action
					 * @returns {Number}
					 */
					addAction: function(action) {
						var id = TheMovement.Entrypoint.Abstract.prototype.addAction.call(this, action);
						var button;

						if (qx.Class.hasInterface(action.constructor, TheMovement.Action.TwoStepExecutionInterface)) {
							button = new qx.ui.form.MenuButton().set({
								appearance: 'button',
								menu: new qx.ui.menu.Menu().set({
									position: 'right-top'
								})
							});
						}
						else {
							button = new qx.ui.form.Button();
						}

						button.set({
							label: this.__formatActionName(action),
							paddingLeft: -1,
							paddingRight: -1
						});
						button.setUserData('actionId', id);
						button.addListener('execute', this.__onClickActionButton, this);
						this.actionButtons[id] = button;

						return id;
					},

					__onRegionCityMenuAppear: function() {
						var menu = webfrontend.gui.region.RegionCityMenu.getInstance();
						var regionObject = menu[this.selectedObjectMemberName];

						if (!menu.hasChildren()) {
							menu.add(this.blankMenu);
						}

						var subMenu = menu.getChildren()[0];

						for (var id in this.actions) {
							if (this.actions[id].supports(regionObject)) {
								subMenu.add(this.actionButtons[id]);
								this.actionButtons[id].setLabel(this.__formatActionName(this.actions[id]));
							}
							else if (this.actionButtons[id].getLayoutParent() === subMenu) {
								subMenu.remove(this.actionButtons[id]);
							}
						}
					},

					/**
					 * @param {qx.event.type.Event} event
					 */
					__onClickActionButton: function(event) {
						var id = event.getTarget().getUserData('actionId');
						var action = this.actions[id];

						var regionObject = webfrontend.gui.region.RegionCityMenu.getInstance()[this.selectedObjectMemberName];
						this.execute(action, regionObject);

						if (qx.Class.hasInterface(action.constructor, TheMovement.Action.TwoStepExecutionInterface)) {
							var options = action.getTwoStepOptions();
							var twoStepMenu = event.getTarget().getMenu();
							this.__clearMenu(twoStepMenu);

							for (var i = 0; i < options.length; i++) {
								var option = options[i];
								var menuButton = new qx.ui.menu.Button(option.label).set({
									marginLeft: -12,
									textColor: option.color
								});

								menuButton.setUserData('actionId', id);
								menuButton.setUserData('optionData', option.data);
								menuButton.addListener('execute', this.__onClickTwoStepMenuButton, this);
								twoStepMenu.add(menuButton);
							}
						}
						else {
							qx.core.Init.getApplication().getBackgroundArea().closeCityInfo();
						}
					},

					/**
					 * @param {qx.event.type.Event} event
					 */
					__onClickTwoStepMenuButton: function(event) {
						var button = event.getTarget();
						var id = button.getUserData('actionId');
						var optionData = button.getUserData('optionData');
						this.actions[id].onTwoStepOptionSelected(optionData, button.getLabel());
					},

					/**
					 * @param {TheMovement.Action.Interface} action
					 * @returns {String}
					 */
					__formatActionName: function(action) {
						var name = action.getName();

						if (qx.Class.hasInterface(action.constructor, TheMovement.Action.TwoStepExecutionInterface)) {
							name += ' \u00BB';
						}

						return name;
					},

					/**
					 * @param {qx.ui.menu.Menu} menu
					 */
					__clearMenu: function(menu) {
						var children = menu.getChildren();
						menu.removeAll();

						for (var i = 0; i < children.length; i++) {
							children[i].dispose();
						}
					}
				}
			});

			qx.Class.define('TheMovement.History', {
				extend: Object,
				construct: function() {
					this.changes = [];
				},
				members: {
					changes: null,

					/**
					 * @param {TheMovement.Action.Interface} action
					 * @param {Object} undoDetails
					 */
					push: function(action, undoDetails) {
						this.changes.push({
							action: action,
							details: undoDetails
						});
					},

					/**
					 * @returns {Boolean}
					 */
					isEmpty: function() {
						return !this.changes.length;
					},

					/**
					 * @returns {String}
					 */
					getLastActionName: function() {
						if (!this.changes.length) {
							throw new Error(this.name + '.prototype.getLastActionName called when history is empty');
						}

						return this.changes[this.changes.length - 1].action.getName();
					},

					/**
					 * @returns {Boolean}
					 */
					undo: function() {
						if (!this.changes.length) {
							throw new Error(this.name + '.prototype.undo called when history is empty');
						}

						var entry = this.changes.pop();
						entry.action.undo(entry.details);

						return this.changes.length > 0;
					},

					clear: function() {
						this.changes = [];
					}
				}
			});

			qx.Class.define('TheMovement.WorldManipulator', {
				extend: Object,
				construct: function(regionManipulator, worldObjectWrapper, hash) {
					this.regionManipulator = regionManipulator;
					this.worldObjectWrapper = worldObjectWrapper;
					this.hash = hash;
					this.dirtySectors = {};

					var matches = ClientLib.Data.WorldSector.prototype.SetDetails.toString()
						.match(/case \$I\.[A-Z]{6}\.City:{.+?this\.([A-Z]{6})\.[A-Z]{6}\(\(\(e<<0x10\)\|d\),g\);.+?var h=this\.([A-Z]{6})\.d\[g\.[A-Z]{6}\];if\(h==null\){return false;}var i=\(\(h\.([A-Z]{6})!=0\) \? this\.([A-Z]{6})\.d\[h\.\3\] : null\);/);
					this.worldSectorObjectsMemberName = matches[1];
					this.worldSectorPlayersMemberName = matches[2];
					this.playerAllianceDataIndexMemberName = matches[3];
					this.worldSectorAlliancesMemberName = matches[4];

					this.playerIdMemberName = ClientLib.Vis.Region.RegionCity.prototype.get_PlayerId.toString().match(/return [A-Za-z]+\.([A-Z]{6});/)[1];
					this.playerNameMemberName = ClientLib.Vis.Region.RegionCity.prototype.get_PlayerName.toString().match(/return [A-Za-z]+\.([A-Z]{6});/)[1];
					this.playerFactionMemberName = ClientLib.Vis.Region.RegionCity.prototype.get_PlayerFaction.toString().match(/return [A-Za-z]+\.([A-Z]{6});/)[1];
					this.allianceIdMemberName = ClientLib.Vis.Region.RegionCity.prototype.get_AllianceId.toString().match(/return [A-Za-z]+\.([A-Z]{6});/)[1];
					this.allianceNameMemberName = ClientLib.Vis.Region.RegionCity.prototype.get_AllianceName.toString().match(/return [A-Za-z]+\.([A-Z]{6});/)[1];

					this.worldSectorVersionMemberName = ClientLib.Data.WorldSector.prototype.get_Version.toString()
						.match(/return this\.([A-Z]{6});/)[1];
					this.updateData$ctorMethodName = ClientLib.Vis.MouseTool.CreateUnitTool.prototype.Activate.toString()
						.match(/\$I\.[A-Z]{6}\.[A-Z]{6}\(\)\.[A-Z]{6}\(\)\.[A-Z]{6}\(\)\.[A-Z]{6}\(\(new \$I\.[A-Z]{6}\)\.([A-Z]{6})\(this,this\.[A-Z]{6}\)\);/)[1];
				},
				members: {
					regionManipulator: null,
					worldObjectWrapper: null,
					hash: null,
					dirtySectors: null,

					worldSectorObjectsMemberName: null,
					worldSectorPlayersMemberName: null,
					playerAllianceDataIndexMemberName: null,
					worldSectorAlliancesMemberName: null,
					playerIdMemberName: null,
					playerNameMemberName: null,
					playerFactionMemberName: null,
					allianceIdMemberName: null,
					allianceNameMemberName: null,
					worldSectorVersionMemberName: null,
					updateData$ctorMethodName: null,

					/**
					 * @param {ClientLib.Data.WorldSector} sector
					 */
					markDirty: function(sector) {
						if (!(sector.get_Id() in this.dirtySectors)) {
							this.dirtySectors[sector.get_Id()] = { alliance: [], player: [] };
						}
					},

					/**
					 * @returns {Boolean}
					 */
					isDirty: function() {
						return Object.keys(this.dirtySectors).length > 0;
					},

					/**
					 * @param {ClientLib.Data.WorldSector} sourceSector
					 * @param {ClientLib.Data.WorldSector} targetSector
					 * @param {ClientLib.Data.WorldSector.WorldObjectCity} worldObject
					 * @returns {Number}
					 */
					__getOrCreatePlayerDataIdFromWorldObject: function(sourceSector, targetSector, worldObject) {
						var playerData = sourceSector.GetPlayer(this.worldObjectWrapper.getPlayerDataIndex(worldObject));
						var allianceData = sourceSector.GetAlliance(playerData[this.playerAllianceDataIndexMemberName]);

						return this.getOrCreatePlayerDataId(targetSector,
							playerData[this.playerIdMemberName],
							playerData[this.playerNameMemberName],
							playerData[this.playerFactionMemberName],
							allianceData ? allianceData[this.allianceIdMemberName] : 0,
							allianceData ? allianceData[this.allianceNameMemberName] : ''
						);
					},

					/**
					 * @param {ClientLib.Data.WorldSector} targetSector
					 * @param {Number} allianceId
					 * @param {String} allianceName
					 * @param {ClientLib.Base.EFactionType} [playerFaction]
					 * @returns {Number}
					 */
					createAnonymousPlayerDataId: function(targetSector, allianceId, allianceName, playerFaction) {
						playerFaction = playerFaction || ClientLib.Base.EFactionType.NotInitialized;
						return this.getOrCreatePlayerDataId(targetSector, 0, '\uFEFF', playerFaction, allianceId, allianceName);
					},

					/**
					 * @param {ClientLib.Data.WorldSector} targetSector
					 * @param {Number} playerId
					 * @param {String} playerName
					 * @param {ClientLib.Base.EFactionType} playerFaction
					 * @param {Number} allianceId
					 * @param {String} allianceName
					 * @returns {Number}
					 */
					getOrCreatePlayerDataId: function(targetSector, playerId, playerName, playerFaction, allianceId, allianceName) {
						var sectorPlayers = targetSector[this.worldSectorPlayersMemberName];
						var playerDataId = null;

						if (playerId !== 0) {
							for (var dataId in sectorPlayers.d) {
								if (sectorPlayers.d[dataId][this.playerIdMemberName] === playerId) {
									playerDataId = dataId;
									break;
								}
							}
						}

						if (playerDataId === null) {
							var sectorChanges = this.dirtySectors[targetSector.get_Id()] || { alliance: [], player: [] };
							var sectorAlliances = targetSector[this.worldSectorAlliancesMemberName];
							var allianceDataId = null;

							for (dataId in sectorAlliances.d) {
								if (sectorAlliances.d[dataId][this.allianceIdMemberName] === allianceId) {
									allianceDataId = dataId;
									break;
								}
							}

							if (allianceDataId === null) {
								var allianceData = (new ClientLib.Data.WorldSector.Alliance).$ctor(
									this.hash.encodeNumber(allianceId)
									+ this.hash.encodeNumber(0)	// unused
									+ allianceName,
									0
								);

								var index = 1024;
								while (sectorAlliances.d[--index]);
								sectorAlliances.d[index] = allianceData;
								sectorAlliances.c++;

								allianceDataId = index;
								sectorChanges.alliance.push(index);
							}

							var factionAndAllianceMask = ((playerFaction % 4) << 1) | (allianceDataId << 3);
							var playerData = (new ClientLib.Data.WorldSector.Player).$ctor(
								this.hash.encodeNumber(playerId)
								+ this.hash.encodeNumber(0)	// unused
								+ this.hash.encodeNumber(factionAndAllianceMask, 2)
								+ playerName,
								0
							);

							index = 1024;
							while (sectorPlayers.d[--index]);
							sectorPlayers.d[index] = playerData;
							sectorPlayers.c++;

							playerDataId = index;
							sectorChanges.player.push(index);

							this.dirtySectors[targetSector.get_Id()] = sectorChanges;
						}

						return playerDataId;
					},

					/**
					 * @param {Object} object
					 * @returns {Object}
					 */
					__clone: function(object) {
						var clone = new object.constructor();

						for (var key in object) {
							if (object.hasOwnProperty(key)) {
								clone[key] = object[key];
							}
						}

						return clone;
					},

					/**
					 * @param {Number} x
					 * @param {Number} y
					 * @returns {Number}
					 */
					__encodeSectorCoords: function(x, y) {
						return ((y % 0x20) << 0x10) | (x % 0x20);
					},

					/**
					 * @param {Number} sourceX
					 * @param {Number} sourceY
					 * @param {Number} destinationX
					 * @param {Number} destinationY
					 */
					relocate: function(sourceX, sourceY, destinationX, destinationY) {
						var world = ClientLib.Data.MainData.GetInstance().get_World();
						var sourceSector = world.GetWorldSectorByCoords(sourceX, sourceY);
						var destinationSector = world.GetWorldSectorByCoords(destinationX, destinationY);

						var encodedSourceSectorCoords = this.__encodeSectorCoords(sourceX, sourceY);
						var worldObject = sourceSector[this.worldSectorObjectsMemberName].d[encodedSourceSectorCoords];

						if (sourceSector !== destinationSector) {
							var playerDataId = this.__getOrCreatePlayerDataIdFromWorldObject(sourceSector, destinationSector, worldObject);
							this.worldObjectWrapper.setPlayerDataIndex(worldObject, playerDataId);
						}

						this.insertWorldObject(worldObject, destinationX, destinationY);
						this.removeWorldObject(sourceX, sourceY);

						this.markDirty(sourceSector);
						this.markDirty(destinationSector);
					},

					/**
					 * @param {ClientLib.Data.WorldSector.WorldObject} worldObject
					 * @param {Number} x
					 * @param {Number} y
					 */
					insertWorldObject: function(worldObject, x, y) {
						var sector = ClientLib.Data.MainData.GetInstance().get_World().GetWorldSectorByCoords(x, y);
						var encodedSectorCoords = this.__encodeSectorCoords(x, y);
						sector[this.worldSectorObjectsMemberName].d[encodedSectorCoords] = worldObject;
					},

					/**
					 * @param {Number} x
					 * @param {Number} y
					 */
					removeWorldObject: function(x, y) {
						var sector = ClientLib.Data.MainData.GetInstance().get_World().GetWorldSectorByCoords(x, y);
						var encodedSectorCoords = this.__encodeSectorCoords(x, y);
						delete sector[this.worldSectorObjectsMemberName].d[encodedSectorCoords];
					},

					reset: function() {
						var world = ClientLib.Data.MainData.GetInstance().get_World();

						for (var sectorId in this.dirtySectors) {
							var changes = this.dirtySectors[sectorId];
							var sector = world.GetSector(sectorId);

							if (changes.alliance.length > 0) {
								var alliances = sector[this.worldSectorAlliancesMemberName];

								for (var i = 0; i < changes.alliance.length; i++) {
									delete alliances.d[changes.alliance[i]];
								}
							}

							if (changes.player.length > 0) {
								var players = sector[this.worldSectorPlayersMemberName];

								for (var i = 0; i < changes.player.length; i++) {
									delete players.d[changes.player[i]];
								}
							}

							// Resetting version causes the whole sector to reload in next Poll request
							sector[this.worldSectorVersionMemberName] = 0;
						}

						this.dirtySectors = {};

						ClientLib.Net.CommunicationManager.GetInstance().RegisterDataReceiver('WORLD', (new ClientLib.Net.UpdateData)[this.updateData$ctorMethodName](this, this.__updateWorldDetour));
					},

					/**
					 * @param {String} type
					 * @param {Object} data
					 */
					__updateWorldDetour: function(type, data) {
						var world = ClientLib.Data.MainData.GetInstance().get_World();
						world.Update(type, data);

						if (type === 'WORLD') {
							this.regionManipulator.updateVisuals();
							ClientLib.Net.CommunicationManager.GetInstance().RegisterDataReceiver('WORLD', (new ClientLib.Net.UpdateData)[this.updateData$ctorMethodName](world, world.Update));
						}
					}
				}
			});

			qx.Class.define('TheMovement.RegionManipulator', {
				extend: Object,
				construct: function(worldObjectWrapper) {
					this.worldObjectWrapper = worldObjectWrapper;

					this.worldSetTerritoryOwnershipMethodName = ClientLib.Data.EndGame.HubCenter.prototype.$ctor.toString()
						.match(/h\.([A-Z]{6})\(i,j,\$I\.[A-Z]{6}\.NPC,0,0,100,true\);/)[1];
					this.regionUpdateMethodName = ClientLib.Vis.Region.Region.prototype.SetPosition.toString()
						.match(/this\.([A-Z]{6})\(\);/)[1];

					var updateSectorsMethodName = ClientLib.Vis.Region.Region.prototype.SetActive.toString()
						.match(/this\.([A-Z]{6})\(\);/)[1];
					var matches = ClientLib.Vis.Region.Region.prototype[updateSectorsMethodName].toString()
						.match(/if \(\(([a-z])\.\$r=this\.([A-Z]{6})\.([A-Z]{6})\([a-z],\1\),([a-z])=\1\.b,\1\.\$r\)\)\{.+\4=\(new \$I\.([A-Z]{6})\)\.([A-Z]{6})\(this, \(([a-z])\.[A-Z]{6}\(\)\*0x20\), \(\7\.[A-Z]{6}\(\)\*0x20\)\);/);
					this.regionSectorsMemberName = matches[2];
					this.regionSectorsTryGetValueMethodName = matches[3];
					var regionSectorClassName = matches[5];
					var regionSector$ctorMethodName = matches[6];

					this.regionSectorObjectsMemberName = $I[regionSectorClassName].prototype[regionSector$ctorMethodName].toString()
						.match(/this\.([A-Z]{6})=\$I\.[A-Z]{6}\.[A-Z]{6}\(\$I\.[A-Z]{6},0x20, 0x20\);/)[1];
				},
				members: {
					worldObjectWrapper: null,

					worldSetTerritoryOwnershipMethodName: null,
					regionUpdateMethodName: null,
					regionSectorsMemberName: null,
					regionSectorsTryGetValueMethodName: null,
					regionSectorObjectsMemberName: null,

					/**
					 * @param {Number} x
					 * @param {Number} y
					 */
					removeInfluence: function(x, y) {
						this.setInfluence(x, y, ClientLib.Data.EOwnerType.Player, 0, 0, 0, false);
					},

					/**
					 * @param {ClientLib.Data.WorldSector.WorldObject} worldObject
					 * @param {Number} x
					 * @param {Number} y
					 * @param {Number} [allianceId]
					 * @param {Number} [playerId]
					 */
					insertObjectInfluence: function(worldObject, x, y, allianceId, playerId) {
						var ownerType, ownerId;

						switch (worldObject.Type) {
							case ClientLib.Data.WorldSector.ObjectType.City:
							case ClientLib.Data.WorldSector.ObjectType.Ruin:
								var hasAlliance = allianceId !== 0 || playerId === 0;
								ownerType = hasAlliance ? ClientLib.Data.EOwnerType.Alliance : ClientLib.Data.EOwnerType.Player;
								ownerId = hasAlliance ? allianceId : playerId;
								break;
							case ClientLib.Data.WorldSector.ObjectType.NPCBase:
								ownerType = ClientLib.Data.EOwnerType.NPC;
								ownerId = 0;
								break;
							default:
								throw new Error(this.name + '.prototype.insertObjectInfluence called with unsupported worldObject');
						}

						this.setInfluence(x, y, ownerType, ownerId, this.worldObjectWrapper.getTerritoryRadius(worldObject), this.worldObjectWrapper.getBaseLevel(worldObject), true);
					},

					/**
					 * @param {Number} x
					 * @param {Number} y
					 * @param {Number} allianceId
					 * @param {Number} playerId
					 * @param {Number} territoryRadius
					 * @param {Number} baseLevel
					 */
					insertPlayerInfluence: function(x, y, allianceId, playerId, territoryRadius, baseLevel) {
						var hasAlliance = allianceId !== 0 || playerId === 0;
						var ownerId = hasAlliance ? allianceId : playerId;
						this.setInfluence(x, y, hasAlliance ? ClientLib.Data.EOwnerType.Alliance : ClientLib.Data.EOwnerType.Player, ownerId, territoryRadius, baseLevel, true);
					},

					/**
					 * @param {Number} x
					 * @param {Number} y
					 * @param {ClientLib.Data.EOwnerType} ownerType
					 * @param {Number} ownerId
					 * @param {Number} territoryRadius
					 * @param {Number} baseLevel
					 * @param {Boolean} isBlocked
					 * @returns {Boolean} True if territory changed, false if it remained as is
					 */
					setInfluence: function(x, y, ownerType, ownerId, territoryRadius, baseLevel, isBlocked) {
						var world = ClientLib.Data.MainData.GetInstance().get_World();
						return world[this.worldSetTerritoryOwnershipMethodName](x, y, ownerType, ownerId, territoryRadius, baseLevel, isBlocked);
					},

					updateVisuals: function() {
						ClientLib.Vis.VisMain.GetInstance().get_Region()[this.regionUpdateMethodName]();
					},

					/**
					 * @param {Number} territoryRadius
					 * @param {Number} baseLevel
					 * @param {Number} allianceId
					 * @param {Number} playerId
					 * @param {Number} sourceX
					 * @param {Number} sourceY
					 * @param {Number} destinationX
					 * @param {Number} destinationY
					 */
					__relocateTerritory: function(territoryRadius, baseLevel, allianceId, playerId, sourceX, sourceY, destinationX, destinationY) {
						this.removeInfluence(sourceX, sourceY);
						this.insertPlayerInfluence(destinationX, destinationY, allianceId, playerId, territoryRadius, baseLevel);
						this.updateVisuals();
					},

					/**
					 * @param {ClientLib.Data.WorldSector.WorldObjectCity} worldObjectCity
					 * @param {Number} allianceId
					 * @param {Number} playerId
					 * @param {Number} sourceX
					 * @param {Number} sourceY
					 * @param {Number} destinationX
					 * @param {Number} destinationY
					 */
					relocateWorldObjectCityTerritory: function(worldObjectCity, allianceId, playerId, sourceX, sourceY, destinationX, destinationY) {
						var territoryRadius = this.worldObjectWrapper.getTerritoryRadius(worldObjectCity);
						var baseLevel = this.worldObjectWrapper.getBaseLevel(worldObjectCity);
						this.__relocateTerritory(territoryRadius, baseLevel, allianceId, playerId, sourceX, sourceY, destinationX, destinationY);
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionCity} regionCity
					 * @param {Number} destinationX
					 * @param {Number} destinationY
					 */
					relocateRegionCityTerritory: function(regionCity, destinationX, destinationY) {
						var worldObject = this.worldObjectWrapper.getWorldObject(regionCity);
						this.relocateWorldObjectCityTerritory(worldObject, regionCity.get_AllianceId(), regionCity.get_PlayerId(), regionCity.get_RawX(), regionCity.get_RawY(), destinationX, destinationY);
					},

					/**
					 * @param {Number} x
					 * @param {Number} y
					 */
					removeObject: function(x, y) {
						var sectorId = ClientLib.Data.MainData.GetInstance().get_World().GetWorldSectorByCoords(x, y).get_Id();
						var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
						var regionX = x % 0x20;
						var regionY = y % 0x20;
						var temp = {};

						if (region[this.regionSectorsMemberName][this.regionSectorsTryGetValueMethodName](sectorId, temp)) {
							var regionSector = temp.b;

							if (regionSector[this.regionSectorObjectsMemberName][regionX][regionY] !== null) {
								regionSector[this.regionSectorObjectsMemberName][regionX][regionY].Dispose();
								regionSector[this.regionSectorObjectsMemberName][regionX][regionY] = null;
							}
						}
					}
				}
			});

			qx.Class.define('TheMovement.WorldObjectWrapper', {
				extend: Object,
				construct: function() {
					this.visObjectTypeNameMap = {};
					this.visObjectTypeNameMap[ClientLib.Vis.VisObject.EObjectType.RegionCityType] = ClientLib.Vis.Region.RegionCity.prototype.get_ConditionDefense.toString().match(/&&\(this\.([A-Z]{6})\.[A-Z]{6}>=0\)/)[1];
					this.visObjectTypeNameMap[ClientLib.Vis.VisObject.EObjectType.RegionNPCBase] = ClientLib.Vis.Region.RegionNPCBase.prototype.get_BaseLevel.toString().match(/return this\.([A-Z]{6})\.[A-Z]{6};/)[1];

					this.territoryRadiusMemberNameMap = {};
					this.territoryRadiusMemberNameMap[ClientLib.Data.WorldSector.ObjectType.City] = ClientLib.Data.WorldSector.WorldObjectCity.prototype.$ctor.toString().match(/this\.([A-Z]{6})=\(\([a-z]>>0x\d+\)&15\);/)[1];
					this.territoryRadiusMemberNameMap[ClientLib.Data.WorldSector.ObjectType.NPCBase] = ClientLib.Data.WorldSector.WorldObjectNPCBase.prototype.$ctor.toString().match(/this\.([A-Z]{6})=\(\([a-z]>>0x12\)&15\);/)[1];
					this.territoryRadiusMemberNameMap[ClientLib.Data.WorldSector.ObjectType.Ruin] = ClientLib.Data.WorldSector.WorldObjectRuin.prototype.$ctor.toString().match(/this\.([A-Z]{6})=\(\(g>>9\)&15\);/)[1];

					this.baseLevelMemberNameMap = {};
					this.baseLevelMemberNameMap[ClientLib.Data.WorldSector.ObjectType.City] = ClientLib.Vis.Region.RegionCity.prototype.get_BaseLevel.toString().match(/return this\.[A-Z]{6}\.([A-Z]{6});/)[1];
					this.baseLevelMemberNameMap[ClientLib.Data.WorldSector.ObjectType.NPCBase] = ClientLib.Vis.Region.RegionNPCBase.prototype.get_BaseLevel.toString().match(/return this\.[A-Z]{6}\.([A-Z]{6});/)[1];
					this.baseLevelMemberNameMap[ClientLib.Data.WorldSector.ObjectType.Ruin] = ClientLib.Vis.Region.RegionRuin.prototype.get_BaseLevel.toString().match(/return this\.[A-Z]{6}\.([A-Z]{6});/)[1];

					this.playerDataIndexMemberNameMap = {};
					this.playerDataIndexMemberNameMap[ClientLib.Data.WorldSector.ObjectType.City] = ClientLib.Data.WorldSector.prototype.SetDetails.toString().match(/case \$I\.[A-Z]{6}\.City:{.+?var ([A-Za-z]+)=this\.[A-Z]{6}\.d\[[A-Za-z]+\.([A-Z]{6})\];if\(\1==null\){return false;}/)[2];
					this.playerDataIndexMemberNameMap[ClientLib.Data.WorldSector.ObjectType.Ruin] = ClientLib.Data.WorldSector.prototype.SetDetails.toString().match(/case \$I\.[A-Z]{6}\.Ruin:{.+?var ([A-Za-z]+)=this\.[A-Z]{6}\.d\[[A-Za-z]+\.([A-Z]{6})\];if\(\1==null\){return false;}/)[2];
				},
				members: {
					visObjectTypeNameMap: null,
					territoryRadiusMemberNameMap: null,
					baseLevelMemberNameMap: null,
					playerDataIndexMemberNameMap: null,

					/**
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @returns {ClientLib.Data.WorldSector.WorldObject}
					 */
					getWorldObject: function(regionObject) {
						var visObjectType = regionObject.get_VisObjectType();

						if (visObjectType in this.visObjectTypeNameMap) {
							return regionObject[this.visObjectTypeNameMap[visObjectType]];
						}

						return ClientLib.Data.MainData.GetInstance().get_World().GetObjectFromPosition(regionObject.get_RawX(), regionObject.get_RawY());
					},

					/**
					 * @param {ClientLib.Data.WorldSector.WorldObject} worldObject
					 * @returns {Number}
					 */
					getTerritoryRadius: function(worldObject) {
						if (!(worldObject.Type in this.territoryRadiusMemberNameMap)) {
							throw new Error(this.name + '.prototype.getTerritoryRadius called with unsupported worldObject');
						}

						return worldObject[this.territoryRadiusMemberNameMap[worldObject.Type]];
					},

					/**
					 * @param {ClientLib.Data.WorldSector.WorldObject} worldObject
					 * @param {Number} territoryRadius
					 */
					setTerritoryRadius: function(worldObject, territoryRadius) {
						if (!(worldObject.Type in this.territoryRadiusMemberNameMap)) {
							throw new Error(this.name + '.prototype.setTerritoryRadius called with unsupported worldObject');
						}

						worldObject[this.territoryRadiusMemberNameMap[worldObject.Type]] = territoryRadius;
					},

					/**
					 * @param {ClientLib.Data.WorldSector.WorldObject} worldObject
					 * @returns {Number}
					 */
					getBaseLevel: function(worldObject) {
						if (!(worldObject.Type in this.baseLevelMemberNameMap)) {
							throw new Error(this.name + '.prototype.getBaseLevel called with unsupported worldObject');
						}

						return worldObject[this.baseLevelMemberNameMap[worldObject.Type]];
					},

					/**
					 * @param {ClientLib.Data.WorldSector.WorldObject} worldObject
					 * @param {Number} baseLevel
					 */
					setBaseLevel: function(worldObject, baseLevel) {
						if (!(worldObject.Type in this.baseLevelMemberNameMap)) {
							throw new Error(this.name + '.prototype.setBaseLevel called with unsupported worldObject');
						}

						worldObject[this.baseLevelMemberNameMap[worldObject.Type]] = baseLevel;
					},

					/**
					 * @param {ClientLib.Data.WorldSector.WorldObject} worldObject
					 * @returns {Number}
					 */
					getPlayerDataIndex: function(worldObject) {
						if (!(worldObject.Type in this.playerDataIndexMemberNameMap)) {
							throw new Error(this.name + '.prototype.getPlayerDataIndex called with unsupported worldObject');
						}

						return worldObject[this.playerDataIndexMemberNameMap[worldObject.Type]];
					},

					/**
					 * @param {ClientLib.Data.WorldSector.WorldObject} worldObject
					 * @param {Number} playerDataIndex
					 */
					setPlayerDataIndex: function(worldObject, playerDataIndex) {
						if (!(worldObject.Type in this.playerDataIndexMemberNameMap)) {
							throw new Error(this.name + '.prototype.setPlayerDataIndex called with unsupported worldObject');
						}

						worldObject[this.playerDataIndexMemberNameMap[worldObject.Type]] = playerDataIndex;
					}
				}
			});

			qx.Class.define('TheMovement.TerritoryIdentity', {
				extend: Object,
				construct: function() {
					this.GetTerritoryTypeByCoordinatesMethodName = ClientLib.Data.World.prototype.CheckFoundBase.toString()
						.match(/switch \(this\.([A-Z]{6})\([a-z],[a-z]\)\)/)[1];

					var rewrittenFunctionBody = ClientLib.Data.World.prototype.GetTerritoryTypeByCoordinates.toString().replace(
						/^(function\s*\()/,
						'$1territoryIdentity,'
					).replace(
						/var ([a-z])=(\$I\.[A-Z]{6}\.[A-Z]{6}\(\)\.[A-Z]{6}\(\))\.[A-Z]{6}\(\);var ([a-z])=\2\.[A-Z]{6}\(\);/,
						'var $1=territoryIdentity.playerId;var $3=territoryIdentity.allianceId;'
					);
					this.GetTerritoryTypeByCoordinatesPatched = eval('(' + rewrittenFunctionBody + ')');

					this.CheckMoveBaseMethodName = ClientLib.Vis.MouseTool.MoveBaseTool.prototype.VisUpdate.toString()
						.match(/var [A-Za-z]+=[A-Za-z]+\.([A-Z]{6})\([A-Za-z]+,[A-Za-z]+,this\.[A-Z]{6}\.[A-Z]{6}\(\),this\.[A-Z]{6}\.[A-Z]{6}\(\),this\.[A-Z]{6}\);/)[1];

					// The second replace takes care of landing on a ruin and the third one landing next to a ruin
					rewrittenFunctionBody = ClientLib.Data.World.prototype[this.CheckMoveBaseMethodName].toString().replace(
						/^(function\s*\()/,
						'$1territoryIdentity,'
					).replace(
						/(var ([A-Za-z]+)=([A-Za-z]+)\.[A-Z]{6}\((n\.[A-Z]{6})\);if\(\(\2!=\$I\.[A-Z]{6}\.[A-Z]{6}\(\)\.[A-Z]{6}\(\)\.[A-Z]{6}\(\)\)&&)\(\$I\.[A-Z]{6}\.[A-Z]{6}\(\)\.[A-Z]{6}\(\)\.[A-Z]{6}\(\2\)==null\)(\)\{[A-Za-z]+\|=\$I\.[A-Z]{6}\.FailFieldOccupied;)/,
						'$1 $3.GetPlayerAllianceId($4) != territoryIdentity.allianceId$5'
					).replace(
						/(var ([A-Za-z]+)=([A-Za-z]+)\.[A-Z]{6}\((w\.[A-Z]{6})\);if\(\(\2!=\$I\.[A-Z]{6}\.[A-Z]{6}\(\)\.[A-Z]{6}\(\)\.[A-Z]{6}\(\)\)&&)\(\$I\.[A-Z]{6}\.[A-Z]{6}\(\)\.[A-Z]{6}\(\)\.[A-Z]{6}\(\2\)==null\)(\)\{[A-Za-z]+\|=\(\$I\.[A-Z]{6}\.FailNeighborRuin)/,
						'$1 $3.GetPlayerAllianceId($4) != territoryIdentity.allianceId$5'
					);
					this.CheckMoveBasePatched = eval('(' + rewrittenFunctionBody + ')');
				},
				members: {
					playerId: null,
					allianceId: null,
					active: false,

					GetTerritoryTypeByCoordinatesMethodName: null,
					GetTerritoryTypeByCoordinatesPatched: null,
					CheckMoveBaseMethodName: null,
					CheckMoveBasePatched: null,

					/**
					 * @param {Number} playerId
					 * @param {Number} allianceId
					 */
					activate: function(playerId, allianceId) {
						this.playerId = playerId;
						this.allianceId = allianceId;

						var world = ClientLib.Data.MainData.GetInstance().get_World();
						world[this.GetTerritoryTypeByCoordinatesMethodName] = this.GetTerritoryTypeByCoordinatesPatched.bind(world, this);
						world[this.CheckMoveBaseMethodName] = this.CheckMoveBasePatched.bind(world, this);
						this.active = true;
					},

					deactivate: function() {
						var world = ClientLib.Data.MainData.GetInstance().get_World();
						world[this.GetTerritoryTypeByCoordinatesMethodName] = ClientLib.Data.World.prototype[this.GetTerritoryTypeByCoordinatesMethodName];
						world[this.CheckMoveBaseMethodName] = ClientLib.Data.World.prototype[this.CheckMoveBaseMethodName];
						this.active = false;
					},

					/**
					 * @returns {Boolean}
					 */
					isActive: function() {
						return this.active;
					}
				}
			});

			qx.Class.define('TheMovement.Hash', {
				extend: Object,
				construct: function() {
					var matches = ClientLib.Data.AllianceSupportState.prototype.Update.toString()
						.match(/switch \(\$I\.([A-Z]{6})\.([A-Z]{6})\([a-z]\.c\[[a-z]\]\.charCodeAt\(0\)\)\)\{/);
					var hashEncoderClassname = matches[1];
					var decodeCharCodeMethodName = matches[2];

					var hashTableMemberName = $I[hashEncoderClassname][decodeCharCodeMethodName].toString()
						.match(/return \$I\.[A-Z]{6}\.([A-Z]{6})\[[a-z]\];/)[1];
					this.hashTable = $I[hashEncoderClassname][hashTableMemberName];
				},
				members: {
					hashTable: null,

					/**
					 * @param {Number} value
					 * @param {Number} [length]
					 * @returns {String}
					 */
					encodeNumber: function(value, length) {
						length = length || 5;
						var result = [];

						for (var i = length - 1; i >= 0; i--) {
							var exponent = Math.pow(0x5b, i);
							var addition = Math.floor(value / exponent);
							value %= exponent;

							result.push(String.fromCharCode(this.hashTable.indexOf(addition)));
						}

						return result.reverse().join('');
					},

					/**
					 * @param {String} value
					 * @returns {String}
					 */
					encodeString: function(value) {
						return '' + this.encodeNumber(value.length, 1) + value;
					}
				}
			});

			qx.Interface.define('TheMovement.Action.Interface', {
				members: {
					/**
					 * @returns {String}
					 */
					getName: function() {},

					/**
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @returns {Boolean}
					 */
					supports: function(regionObject) {
						this.assertInstance(regionObject, ClientLib.Vis.Region.RegionObject);
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @param {TheMovement.Entrypoint.Interface} entrypoint
					 * @returns {Object} Undo details; information needed by the action to revert the change later
					 */
					execute: function(regionObject, entrypoint) {
						this.assertInstance(regionObject, ClientLib.Vis.Region.RegionObject);
						this.assertInterface(entrypoint, TheMovement.Entrypoint.Interface);
					},

					/**
					 * @param {Object} details
					 */
					undo: function(details) {
						this.assertInstance(details, Object);
					}
				}
			});

			/**
			 * Implementation may call entrypoint.onExecution() on actual execution to propagate history change
			 */
			qx.Interface.define('TheMovement.Action.IndirectExecutionInterface');
			/**
			 * For implementations that have a selection of options the user should choose from before executing
			 */
			qx.Interface.define('TheMovement.Action.TwoStepExecutionInterface', {
				members: {
					/**
					 * @returns {Array}
					 */
					getTwoStepOptions: function() {},

					/**
					 * @param {*} data
					 * @param {String} label
					 */
					onTwoStepOptionSelected: function(data, label) {}
				}
			});

			qx.Interface.define('TheMovement.Action.ObserverInterface', {
				members: {
					/**
					 * @param {TheMovement.Action.Interface} action
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 */
					onActionExecute: function(action, regionObject) {
						this.assertInterface(action, TheMovement.Action.Interface);
						this.assertInstance(regionObject, ClientLib.Vis.Region.RegionObject);
					}
				}
			});

			qx.Class.define('TheMovement.Action.PlanMove', {
				extend: Object,
				implement: [TheMovement.Action.Interface, TheMovement.Action.IndirectExecutionInterface],
				construct: function(worldManipulator, regionManipulator, territoryIdentity) {
					this.worldManipulator = worldManipulator;
					this.regionManipulator = regionManipulator;
					this.territoryIdentity = territoryIdentity;

					this.moveInfoOnMouseUpMethodName = Function.prototype.toString.call(webfrontend.gui.region.RegionCityMoveInfo.constructor)
						.match(/attachNetEvent\(this\.[A-Za-z0-9_]+,[A-Za-z]+,ClientLib\.Vis\.MouseTool\.OnMouseUp,this,this\.([A-Za-z0-9_]+)\);/)[1];
				},
				members: {
					worldManipulator: null,
					regionManipulator: null,
					territoryIdentity: null,
					originalOwnCityId: null,
					currentRegionCity: null,
					entrypoint: null,

					moveInfoOnMouseUpMethodName: null,

					/**
					 * @returns {String}
					 */
					getName: function() {
						return 'Plan move base';
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @returns {Boolean}
					 */
					supports: function(regionObject) {
						return regionObject instanceof ClientLib.Vis.Region.RegionCity;
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionCity} regionCity
					 * @param {TheMovement.Entrypoint.Interface} entrypoint
					 */
					execute: function(regionCity, entrypoint) {
						this.originalOwnCityId = null;
						this.currentRegionCity = regionCity;
						this.entrypoint = entrypoint;

						var cities = ClientLib.Data.MainData.GetInstance().get_Cities();

						if (regionCity.get_VisObjectType() === ClientLib.Vis.VisObject.EObjectType.RegionCityType && regionCity.get_Type() !== ClientLib.Vis.Region.RegionCity.ERegionCityType.Own) {
							var city = cities.GetCity(regionCity.get_Id());
							var player = ClientLib.Data.MainData.GetInstance().get_Player();

							if (city.get_Version() < 0) {
								// City data is not available, so fill in the minimum required information based on the regionObject
								city.SetPosition(regionCity.get_RawX(), regionCity.get_RawY());
								city.set_BaseLevel(regionCity.get_BaseLevel());

								if (regionCity.get_hasMoveRestriction()) {
									var restrictions = city.get_MoveRestrictions();
									restrictions.d[regionCity.get_MoveRestrictionCoord()] = regionCity.get_MoveRestrictionEndStep();
									restrictions.c++;
								}
							}

							if (regionCity.get_AllianceId() !== player.get_AllianceId() || (!player.get_AllianceId() && !regionCity.IsOwnBase())) {
								this.territoryIdentity.activate(regionCity.get_PlayerId(), regionCity.get_AllianceId());
							}

							this.originalOwnCityId = cities.get_CurrentOwnCityId();
							cities.set_CurrentOwnCityId(regionCity.get_Id());
						}

						var mouseTool = ClientLib.Vis.VisMain.GetInstance().GetMouseTool(ClientLib.Vis.MouseTool.EMouseTool.MoveBase);
						phe.cnc.Util.attachNetEvent(mouseTool, 'OnDeactivate', ClientLib.Vis.MouseTool.OnDeactivate, this, this.__onDeactivateMoveBaseTool);

						var cityMoveInfo = webfrontend.gui.region.RegionCityMoveInfo.getInstance();
						phe.cnc.Util.detachNetEvent(mouseTool, 'OnMouseUp', ClientLib.Vis.MouseTool.OnMouseUp, cityMoveInfo, cityMoveInfo[this.moveInfoOnMouseUpMethodName]);
						phe.cnc.Util.attachNetEvent(mouseTool, 'OnMouseUp', ClientLib.Vis.MouseTool.OnMouseUp, this, this.__onMouseUp);
						cityMoveInfo.setCity(regionCity);

						ClientLib.Vis.VisMain.GetInstance().SetMouseTool(ClientLib.Vis.MouseTool.EMouseTool.MoveBase, cities.get_CurrentOwnCityId());
					},

					__onDeactivateMoveBaseTool: function() {
						var mouseTool = ClientLib.Vis.VisMain.GetInstance().GetMouseTool(ClientLib.Vis.MouseTool.EMouseTool.MoveBase);
						phe.cnc.Util.detachNetEvent(mouseTool, 'OnDeactivate', ClientLib.Vis.MouseTool.OnDeactivate, this, this.__onDeactivateMoveBaseTool);

						var cityMoveInfo = webfrontend.gui.region.RegionCityMoveInfo.getInstance();
						phe.cnc.Util.detachNetEvent(mouseTool, 'OnMouseUp', ClientLib.Vis.MouseTool.OnMouseUp, this, this.__onMouseUp);
						phe.cnc.Util.attachNetEvent(mouseTool, 'OnMouseUp', ClientLib.Vis.MouseTool.OnMouseUp, cityMoveInfo, cityMoveInfo[this.moveInfoOnMouseUpMethodName]);

						if (this.originalOwnCityId !== null) {
							ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId(this.originalOwnCityId);
							this.originalOwnCityId = null;
						}

						if (this.territoryIdentity.isActive()) {
							this.territoryIdentity.deactivate();
						}
					},

					/**
					 * @param {Number} visX
					 * @param {Number} visY
					 * @param {String} mouseButton
					 */
					__onMouseUp: function(visX, visY, mouseButton) {
						if (mouseButton === 'right') {
							return;
						}

						if (this.currentRegionCity === null) {
							throw new Error(this.name + '.prototype.onMouseUp called without city being selected');
						}
						else if (this.entrypoint === null) {
							throw new Error(this.name + '.prototype.onMouseUp called without entrypoint');
						}

						var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
						var x = Math.floor(visX / region.get_GridWidth());
						var y = Math.floor(visY / region.get_GridHeight());

						var moveBaseResult = ClientLib.Vis.VisMain.GetInstance().GetMouseTool(ClientLib.Vis.MouseTool.EMouseTool.MoveBase).GetCheckMoveBaseResult(x, y);

						if (moveBaseResult === ClientLib.Data.EMoveBaseResult.OK || moveBaseResult === ClientLib.Data.EMoveBaseResult.FailCampIsAttacked) {
							var undoDetails = {
								cityId: this.currentRegionCity.get_Id(),
								allianceId: this.currentRegionCity.get_AllianceId(),
								playerId: this.currentRegionCity.get_PlayerId(),
								source: { x: x, y: y },
								destination: { x: this.currentRegionCity.get_RawX(), y: this.currentRegionCity.get_RawY() }
							};

							this.__moveRegionCity(this.currentRegionCity, x, y);
							ClientLib.Vis.VisMain.GetInstance().SetMouseTool(ClientLib.Vis.MouseTool.EMouseTool.SelectRegion, null);

							this.entrypoint.onExecution(this, this.currentRegionCity, undoDetails);
							this.entrypoint = this.currentRegionCity = null;
						}
						else if (moveBaseResult & ClientLib.Data.EMoveBaseResult.FailOldBasePosition) {
							ClientLib.Vis.VisMain.GetInstance().SetMouseTool(ClientLib.Vis.MouseTool.EMouseTool.SelectRegion, null);
						}
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionCity} regionCity
					 * @param {Number} destinationX
					 * @param {Number} destinationY
					 */
					__moveRegionCity: function(regionCity, destinationX, destinationY) {
						this.regionManipulator.relocateRegionCityTerritory(regionCity, destinationX, destinationY);
						this.worldManipulator.relocate(regionCity.get_RawX(), regionCity.get_RawY(), destinationX, destinationY);

						var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(regionCity.get_Id());
						city.SetPosition(destinationX, destinationY);
					},

					/**
					 * @param {Object} details
					 */
					undo: function(details) {
						var worldObject = ClientLib.Data.MainData.GetInstance().get_World().GetObjectFromPosition(details.source.x, details.source.y);
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(details.cityId);

						if (worldObject === null || worldObject.Type !== ClientLib.Data.WorldSector.ObjectType.City) {
							throw new Error(this.name + '.prototype.undo cannot find city at ' + details.source.x + ':' + details.source.y);
						}

						this.worldManipulator.relocate(details.source.x, details.source.y, details.destination.x, details.destination.y);
						this.regionManipulator.relocateWorldObjectCityTerritory(worldObject, details.allianceId, details.playerId, details.source.x, details.source.y, details.destination.x, details.destination.y);

						if (city !== null) {
							city.SetPosition(details.destination.x, details.destination.y);
						}
					}
				}
			});

			qx.Class.define('TheMovement.Action.PlanRuin', {
				extend: Object,
				implement: [TheMovement.Action.Interface],
				construct: function(worldManipulator, regionManipulator, worldObjectWrapper, hash) {
					this.worldManipulator = worldManipulator;
					this.regionManipulator = regionManipulator;
					this.worldObjectWrapper = worldObjectWrapper;
					this.hash = hash;
				},
				members: {
					worldManipulator: null,
					regionManipulator: null,
					worldObjectWrapper: null,
					hash: null,

					/**
					 * @returns {String}
					 */
					getName: function() {
						return 'Plan ruin';
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @returns {Boolean}
					 */
					supports: function(regionObject) {
						return regionObject.get_VisObjectType() === ClientLib.Vis.VisObject.EObjectType.RegionNPCBase
							|| (regionObject.get_VisObjectType() === ClientLib.Vis.VisObject.EObjectType.RegionCityType && regionObject.get_Type() !== ClientLib.Vis.Region.RegionCity.ERegionCityType.Own);
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @param {TheMovement.Entrypoint.Interface} entrypoint
					 * @returns {Object}
					 */
					execute: function(regionObject, entrypoint) {
						var world = ClientLib.Data.MainData.GetInstance().get_World();
						var sector = world.GetWorldSectorByCoords(regionObject.get_RawX(), regionObject.get_RawY());
						var hash = this._createRuinHash(regionObject);

						sector.SetDetails(hash, 1);
						this.worldManipulator.markDirty(sector);
						this.regionManipulator.updateVisuals();

						return {
							allianceId: regionObject.get_AllianceId(),
							playerId: regionObject.get_PlayerId(),
							worldObject: this.worldObjectWrapper.getWorldObject(regionObject),
							x: regionObject.get_RawX(),
							y: regionObject.get_RawY()
						};
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionCity|ClientLib.Vis.Region.RegionNPCBase} regionObject
					 * @param {Number} [playerDataId]
					 * @param {String} [attackerCityName]
					 * @returns {String}
					 */
					_createRuinHash: function(regionObject, playerDataId, attackerCityName) {
						var encodeNumber = this.hash.encodeNumber.bind(this.hash);
						var encodeString = this.hash.encodeString.bind(this.hash);

						if (playerDataId === undefined || attackerCityName === undefined) {
							var attackerCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							var world = ClientLib.Data.MainData.GetInstance().get_World();
							var targetSector = world.GetWorldSectorByCoords(regionObject.get_RawX(), regionObject.get_RawY());

							this.worldManipulator.markDirty(targetSector);
							playerDataId = this.worldManipulator.getOrCreatePlayerDataId(targetSector, attackerCity.get_PlayerId(), attackerCity.get_PlayerName(), attackerCity.get_CityFaction(), attackerCity.get_AllianceId(), attackerCity.get_AllianceName());
							attackerCityName = attackerCity.get_Name();
						}

						var isPlayerCity = regionObject.get_VisObjectType() === ClientLib.Vis.VisObject.EObjectType.RegionCityType;
						var worldObject = this.worldObjectWrapper.getWorldObject(regionObject);

						var mask = isPlayerCity ? 1 : 0;
						mask |= (regionObject.get_BaseLevel() & 0xff) << 1;
						mask |= (this.worldObjectWrapper.getTerritoryRadius(worldObject) & 0xf) << 9;
						mask |= (playerDataId & 0x3ff) << 13;

						var detailsHash = '';
						detailsHash += encodeNumber(ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep());
						detailsHash += encodeString(attackerCityName);

						if (isPlayerCity) {
							detailsHash += encodeNumber(regionObject.get_PlayerId());
							detailsHash += encodeNumber(regionObject.get_AllianceId());
							detailsHash += encodeNumber(regionObject.get_PlayerFaction());
							detailsHash += encodeString(regionObject.get_PlayerName());
							detailsHash += encodeString(regionObject.get_AllianceName());
							detailsHash += regionObject.get_Name();
						}

						var locationMask = (regionObject.get_RawX() % 0x20) | ((regionObject.get_RawY() % 0x20) << 5) | (ClientLib.Data.WorldSector.ObjectType.Ruin << 10);
						var locationHash = 'C' + encodeNumber(locationMask, 2);
						var maskHash = encodeNumber(mask, 4);

						return locationHash + maskHash + detailsHash;
					},

					/**
					 * @param {Object} details
					 */
					undo: function(details) {
						// Replace ruin with whatever was at the coordinates
						this.worldManipulator.insertWorldObject(details.worldObject, details.x, details.y);
						this.regionManipulator.insertObjectInfluence(details.worldObject, details.x, details.y, details.allianceId, details.playerId);

						try {
							// Remove object from region to make visual update immediate. If this fails, region will still be updated a second later
							this.regionManipulator.removeObject(details.x, details.y);
						}
						catch (e) {
						}

						this.regionManipulator.updateVisuals();
					}
				}
			});

			qx.Class.define('TheMovement.Action.PlanRuinFor', {
				extend: TheMovement.Action.PlanRuin,
				implement: [TheMovement.Action.IndirectExecutionInterface, TheMovement.Action.TwoStepExecutionInterface],
				statics: {
					RelationshipColors: {}
				},
				defer: function(statics) {
					statics.RelationshipColors[ClientLib.Data.EAllianceDiplomacyStatus.None] = '#ff4500';
					statics.RelationshipColors[ClientLib.Data.EAllianceDiplomacyStatus.Friend] = '#00cc00';
					statics.RelationshipColors[ClientLib.Data.EAllianceDiplomacyStatus.NAP] = '#f5f5dc';
					statics.RelationshipColors[ClientLib.Data.EAllianceDiplomacyStatus.Foe] = '#960018';
					statics.RelationshipColors[ClientLib.Data.EAllianceDiplomacyStatus.Neutral] = '#ff4500';
				},
				members: {
					relationshipColors: null,
					regionObject: null,
					entrypoint: null,

					/**
					 * @returns {String}
					 */
					getName: function() {
						return 'Plan ruin for';
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @param {TheMovement.Entrypoint.Interface} entrypoint
					 */
					execute: function(regionObject, entrypoint) {
						this.regionObject = regionObject;
						this.entrypoint = entrypoint;
					},

					/**
					 * @returns {Array}
					 */
					getTwoStepOptions: function() {
						var ownAlliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
						var alliances = [{
							label: 'No alliance',
							color: this.constructor.RelationshipColors[ClientLib.Data.EAllianceDiplomacyStatus.None],
							data: 0
						}];

						if (ownAlliance.get_Exists() && ownAlliance.get_Relationships() !== null) {
							alliances = alliances.concat(ownAlliance.get_Relationships()
								.filter(function(relationship) {
									return relationship.IsConfirmed;
								}, this)
								.map(function(relationship) {
									return {
										label: relationship.OtherAllianceName,
										color: this.constructor.RelationshipColors[relationship.Relationship],
										data: relationship.OtherAllianceId
									};
								}, this)
								.sort(function(a, b) {
									return a.label.localeCompare(b.label);
								})
							);
						}

						return alliances;
					},

					/**
					 * @param {*} id
					 * @param {String} label
					 */
					onTwoStepOptionSelected: function(id, label) {
						var world = ClientLib.Data.MainData.GetInstance().get_World();
						var sector = world.GetWorldSectorByCoords(this.regionObject.get_RawX(), this.regionObject.get_RawY());
						var playerDataId = this.worldManipulator.createAnonymousPlayerDataId(sector, id, label);
						var hash = this._createRuinHash(this.regionObject, playerDataId, label);

						sector.SetDetails(hash, 1);
						this.worldManipulator.markDirty(sector);
						this.regionManipulator.updateVisuals();

						this.entrypoint.onExecution(this, this.regionObject, {
							allianceId: this.regionObject.get_AllianceId(),
							playerId: this.regionObject.get_PlayerId(),
							worldObject: this.worldObjectWrapper.getWorldObject(this.regionObject),
							x: this.regionObject.get_RawX(),
							y: this.regionObject.get_RawY()
						});
						this.entrypoint = this.regionObject = null;
					}
				}
			});

			qx.Class.define('TheMovement.Action.PlanLevelUp', {
				extend: Object,
				implement: [TheMovement.Action.Interface],
				construct: function(worldManipulator, regionManipulator, worldObjectWrapper) {
					this.worldManipulator = worldManipulator;
					this.regionManipulator = regionManipulator;
					this.worldObjectWrapper = worldObjectWrapper;
				},
				members: {
					worldManipulator: null,
					regionManipulator: null,
					worldObjectWrapper: null,

					/**
					 * @returns {String}
					 */
					getName: function() {
						return 'Plan level up';
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @returns {Boolean}
					 */
					supports: function(regionObject) {
						return regionObject.get_VisObjectType() === ClientLib.Vis.VisObject.EObjectType.RegionCityType
							&& regionObject.get_BaseLevel() < ClientLib.Data.MainData.GetInstance().get_Server().get_PlayerUpgradeCap();
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionCity} regionCity
					 * @param {TheMovement.Entrypoint.Interface} entrypoint
					 * @returns {Object}
					 */
					execute: function(regionCity, entrypoint) {
						var x = regionCity.get_RawX();
						var y = regionCity.get_RawY();

						var sector = ClientLib.Data.MainData.GetInstance().get_World().GetWorldSectorByCoords(x, y);
						this.worldManipulator.markDirty(sector);

						var worldObjectCity = this.worldObjectWrapper.getWorldObject(regionCity);
						this.worldObjectWrapper.setBaseLevel(worldObjectCity, regionCity.get_BaseLevel() + 1);

						this.regionManipulator.insertObjectInfluence(worldObjectCity, x, y, regionCity.get_AllianceId(), regionCity.get_PlayerId());
						this.regionManipulator.removeObject(x, y);
						this.regionManipulator.updateVisuals();

						return {
							allianceId: regionCity.get_AllianceId(),
							playerId: regionCity.get_PlayerId(),
							worldObject: worldObjectCity,
							x: x,
							y: y
						};
					},

					/**
					 * @param {Object} details
					 */
					undo: function(details) {
						var baseLevel = this.worldObjectWrapper.getBaseLevel(details.worldObject) - 1;
						this.worldObjectWrapper.setBaseLevel(details.worldObject, baseLevel);

						this.regionManipulator.insertObjectInfluence(details.worldObject, details.x, details.y, details.allianceId, details.playerId);
						this.regionManipulator.removeObject(details.x, details.y);
						this.regionManipulator.updateVisuals();
					}
				}
			});

			qx.Class.define('TheMovement.Action.PlanRemove', {
				extend: Object,
				implement: [TheMovement.Action.Interface],
				construct: function(worldManipulator, regionManipulator, worldObjectWrapper) {
					this.worldManipulator = worldManipulator;
					this.regionManipulator = regionManipulator;
					this.worldObjectWrapper = worldObjectWrapper;
				},
				members: {
					worldManipulator: null,
					regionManipulator: null,
					worldObjectWrapper: null,

					/**
					 * @returns {String}
					 */
					getName: function() {
						return 'Plan remove';
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @returns {Boolean}
					 */
					supports: function(regionObject) {
						return regionObject.get_VisObjectType() === ClientLib.Vis.VisObject.EObjectType.RegionNPCBase
							|| regionObject.get_VisObjectType() === ClientLib.Vis.VisObject.EObjectType.RegionRuin
							|| (regionObject.get_VisObjectType() === ClientLib.Vis.VisObject.EObjectType.RegionCityType && regionObject.get_Type() !== ClientLib.Vis.Region.RegionCity.ERegionCityType.Own);
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @param {TheMovement.Entrypoint.Interface} entrypoint
					 * @returns {Object}
					 */
					execute: function(regionObject, entrypoint) {
						var x = regionObject.get_RawX();
						var y = regionObject.get_RawY();

						var sector = ClientLib.Data.MainData.GetInstance().get_World().GetWorldSectorByCoords(x, y);
						this.worldManipulator.markDirty(sector);

						var worldObject = this.worldObjectWrapper.getWorldObject(regionObject);

						this.worldManipulator.removeWorldObject(x, y);
						this.regionManipulator.removeInfluence(x, y);
						this.regionManipulator.updateVisuals();

						return {
							allianceId: regionObject.get_AllianceId(),
							playerId: regionObject.get_PlayerId(),
							worldObject: worldObject,
							x: x,
							y: y
						};
					},

					/**
					 * @param {Object} details
					 */
					undo: function(details) {
						this.worldManipulator.insertWorldObject(details.worldObject, details.x, details.y);
						this.regionManipulator.insertObjectInfluence(details.worldObject, details.x, details.y, details.allianceId, details.playerId);
						this.regionManipulator.updateVisuals();
					}
				}
			});

			qx.Class.define('TheMovement.Action.Undo', {
				extend: Object,
				implement: [TheMovement.Action.Interface, TheMovement.Action.IndirectExecutionInterface],
				construct: function(regionManipulator, history) {
					this.regionManipulator = regionManipulator;
					this.history = history;
				},
				members: {
					regionManipulator: null,
					history: null,

					/**
					 * @returns {String}
					 */
					getName: function() {
						var name = 'Undo';

						if (!this.history.isEmpty()) {
							var actionName = this.history.getLastActionName();
							name += ' ' + actionName.substr(0, 1).toLowerCase() + actionName.substr(1);
						}

						return name;
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @returns {Boolean}
					 */
					supports: function(regionObject) {
						return !this.history.isEmpty();
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @param {TheMovement.Entrypoint.Interface} entrypoint
					 */
					execute: function(regionObject, entrypoint) {
						try {
							this.history.undo();
						}
						finally {
							this.regionManipulator.updateVisuals();
						}
					},

					/**
					 * @param {Object} details
					 */
					undo: function(details) {
						// Class implements IndirectExecutionInterface, but never calls Entrypoint.onExecution() -> nothing to undo
					}
				}
			});

			qx.Class.define('TheMovement.Action.Reset', {
				extend: Object,
				implement: [TheMovement.Action.Interface, TheMovement.Action.IndirectExecutionInterface],
				construct: function(worldManipulator, regionManipulator, history) {
					this.worldManipulator = worldManipulator;
					this.regionManipulator = regionManipulator;
					this.history = history;
				},
				members: {
					worldManipulator: null,
					regionManipulator: null,
					history: null,

					/**
					 * @returns {String}
					 */
					getName: function() {
						return 'Reset plans';
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @returns {Boolean}
					 */
					supports: function(regionObject) {
						return this.worldManipulator.isDirty();
					},

					/**
					 * @param {ClientLib.Vis.Region.RegionObject} regionObject
					 * @param {TheMovement.Entrypoint.Interface} entrypoint
					 */
					execute: function(regionObject, entrypoint) {
						try {
							if (!this.history.isEmpty()) {
								while (this.history.undo());
							}
						}
						catch (e) {
							this.history.clear();
							throw e;
						}
						finally {
							this.regionManipulator.updateVisuals();
							this.worldManipulator.reset();
						}
					},

					/**
					 * @param {Object} details
					 */
					undo: function(details) {
						// Class implements IndirectExecutionInterface, but never calls Entrypoint.onExecution() -> nothing to undo
					}
				}
			});
		}

		function waitForGame() {
			try {
				if (typeof qx !== 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().initDone) {
					createTheMovement();

					var history = new TheMovement.History();
					var hash = new TheMovement.Hash();
					var worldObjectWrapper = new TheMovement.WorldObjectWrapper();
					var regionManipulator = new TheMovement.RegionManipulator(worldObjectWrapper);
					var worldManipulator = new TheMovement.WorldManipulator(regionManipulator, worldObjectWrapper, hash);
					var territoryIdentity = new TheMovement.TerritoryIdentity();

					var instance = TheMovement.getInstance();
					instance.registerEntrypoint(new TheMovement.Entrypoint.RegionMenu(history));
					instance.registerAction(new TheMovement.Action.Reset(worldManipulator, regionManipulator, history));
					instance.registerAction(new TheMovement.Action.Undo(regionManipulator, history));
					instance.registerAction(new TheMovement.Action.PlanMove(worldManipulator, regionManipulator, territoryIdentity));
					instance.registerAction(new TheMovement.Action.PlanRuin(worldManipulator, regionManipulator, worldObjectWrapper, hash));
					instance.registerAction(new TheMovement.Action.PlanRuinFor(worldManipulator, regionManipulator, worldObjectWrapper, hash));
					instance.registerAction(new TheMovement.Action.PlanLevelUp(worldManipulator, regionManipulator, worldObjectWrapper));
					instance.registerAction(new TheMovement.Action.PlanRemove(worldManipulator, regionManipulator, worldObjectWrapper));
				}
				else {
					setTimeout(waitForGame, 1000);
				}
			}
			catch (e) {
				console.log('TheMovement: ', e.toString());
			}
		}

		setTimeout(waitForGame, 1000);
	};

	var script = document.createElement('script');
	script.innerHTML = '(' + main.toString() + ')();';
	script.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(script);
})();
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('\'1T 25\';(17(){11 24=\'1.0.2\';11 1W=34;11 20=17(Z,1P){\'1T 25\';17 1V(){11 d,1b;11 e=17(a,b){1O(11 c 1L a){13(a.33(c)&&15 a[c]===\'17\'&&b.26(a[c])){1f c}}31\'30 2X 2W 2V 2S 2R\';};13(15 5.19.1t.7.23!==\'17\'){d=5.19.2Q.2o.7.2M.14();11 f=d.16(/11 [a-z]=12\\.[A-Z]{6}\\.([A-Z]{6})\\(\\);/)[1];5.19.1t.7.23=5.19.1t.7[f]}13(15 5.8.9===\'1c\'){5.8.9=17(){}}13(15 5.8.9.18===\'1c\'){13(15 5.8.1o.7.$1C!==\'17\'){d=5.8.1o.2L.14();11 g=d.16(/\\$I\\.([A-Z]{6})\\.[A-Z]{6}=\\(1d \\$I\\.\\1\\)\\.([A-Z]{6})\\(\\);/)[2];5.8.1o.7.$1C=5.8.1o.7[g]}d=5.8.1o.7.$1C.14();11 h=d.16(/13\\(\\(12\\.([A-Z]{6})\\[0\\]==1B\\)&&\\$I\\.([A-Z]{6})\\.[A-Z]{6}\\(\\)\\)\\{12\\.\\1\\[0\\]="18";/)[2];13(15 $I[h].7.1u!==\'17\'){d=5.8.1o.7.1u.14();11 i=d.16(/1f [a-z]\\.([A-Z]{6})\\([a-z]\\);\\}$/)[1];$I[h].7.1u=$I[h].7[i]}d=$I[h].7.1u.14();11 j=d.16(/1f \\(1d \\$I\\.([A-Z]{6})\\)\\.[A-Z]{6}\\([a-z]\\);\\}$/)[1];5.8.9.18=$I[j]}13(15 5.8.9.18.1s===\'1c\'||15 5.8.9.18.1s.7.27!==\'17\'){d=5.19.1h.1h.7.2c.14();11 k=d.16(/12\\.[A-Z]{6}=12\\.[A-Z]{6}\\.([A-Z]{6})\\(0,0\\);/)[1];d=5.8.9.18.7[k].14();11 l=d.16(/\\(1d \\$I\\.([A-Z]{6})\\)/)[1];5.8.9.18.1s=$I[l];d=5.19.1h.1A.7.2K.14();11 m=d.16(/\\{12\\.([A-Z]{6})\\(\\);\\}/)[1];d=5.19.1h.1A.7[m].14();11 n=d.16(/13\\(12\\.([A-Z]{6})\\(\\)&&/)[1];d=5.19.1h.1A.7[n].14();11 o=d.16(/12\\.[A-Z]{6}\\.[A-Z]{6}\\(\\)\\.([A-Z]{6})\\(12\\.([A-Z]{6})\\.2H,12\\.\\2\\.1a\\);/)[1];5.8.9.18.1s.7.27=5.8.9.18.1s.7[o]}13(15 5.8.9.18.7.1p!==\'17\'){d=5.19.1t.7.2G.14();11 p=d.16(/12\\.[A-Z]{6}\\.([A-Z]{6})\\("1S",1B\\);/)[1];5.8.9.18.7.1p=5.8.9.18.7[p]}13(15 5.8.9.18.7.1H!==\'17\'){d=5.19.1i.1k.7.1z.14();11 q=d.16(/[a-z]\\.([A-Z]{6})\\("1X"\\);/)[1];5.8.9.18.7.1H=5.8.9.18.7[q]}13(15 5.8.9.18.7.1Y!==\'17\'){d=5.1m.1n.7.2F.14();11 r=d.16(/12\\.[A-Z]{6}\\.([A-Z]{6})\\(12\\.[A-Z]{6}\\);/)[1];5.8.9.18.7.1Y=5.8.9.18.7[r]}13(15 5.8.9.18.7.22!==\'17\'){d=5.1m.1n.7.2E.14();11 s=d.16(/12\\.[A-Z]{6}\\.([A-Z]{6})\\(12\\.[A-Z]{6}\\);/)[1];5.8.9.18.7.22=5.8.9.18.7[s]}13(15 5.8.9.10===\'1c\'){5.8.9.10=17(){}}13(15 5.8.9.10.10===\'1c\'||15 5.8.9.10.1g===\'1c\'){d=5.8.9.18.7.1p.14();1b=d.16(/13\\([a-z]=="2D"\\)\\{1f \\(1d \\$I\\.([A-Z]{6})\\)\\.([A-Z]{6})\\(\\);\\}/);11 t=1b[1];11 u=1b[2];5.8.9.10.1g=$I[t];d=5.8.9.10.1g.7[u].14();11 v=d.16(/\\$I\\.([A-Z]{6})\\.7\\.[A-Z]{6}\\.2B \\(12\\);/)[1];5.8.9.10.10=$I[v]}13(15 5.8.9.10.10.7.1D!==\'17\'){d=5.1m.1n.7.1D.14();11 w=d.16(/12\\.[A-Z]{6}\\.([A-Z]{6})\\([a-z]\\);\\}$/)[1];5.8.9.10.10.7.1D=5.8.9.10.10.7[w]}13(15 5.8.9.10.10.7.1E!==\'17\'){d=5.1m.1n.7.1E.14();11 x=d.16(/12\\.[A-Z]{6}\\.([A-Z]{6})\\([a-z]\\);\\}$/)[1];5.8.9.10.10.7.1E=5.8.9.10.10.7[x]}13(15 5.8.9.10.10.7.1F!==\'17\'){d=5.1m.1n.7.1F.14();11 y=d.16(/12\\.[A-Z]{6}\\.([A-Z]{6})\\(\\(/)[1];5.8.9.10.10.7.1F=5.8.9.10.10.7[y]}13(15 5.8.9.10.10.7.1G!==\'17\'){d=5.1m.1n.7.1G.14();11 z=d.16(/12\\.[A-Z]{6}\\.([A-Z]{6})\\(\\(/)[1];5.8.9.10.10.7.1G=5.8.9.10.10.7[z]}13(15 5.8.9.10.10.7.1w!==\'17\'||15 5.8.9.10.10.7.28!==\'17\'){d=5.19.1i.1k.7.1z.14();1b=d.16(/12\\.([A-Z]{6})\\.([A-Z]{6})\\(12\\.([A-Z]{6})\\.w\\);12\\.\\1\\.([A-Z]{6})\\(12\\.\\3\\.h\\);/);11 A=1b[2];11 B=1b[4];5.8.9.10.10.7.1w=5.8.9.10.10.7[A];5.8.9.10.10.7.28=5.8.9.10.10.7[B]}13(15 5.8.9.10.1g.7.2a!==\'17\'||15 5.8.9.10.1g.7.2b!==\'17\'){13(15 5.19.1i.1k.7.1J!==\'17\'){d=5.19.1i.2y.7.2w.14();11 C=d.16(/12\\.([A-Z]{6})\\(\\);}/)[1];5.19.1i.1k.7.1J=5.19.1i.1k.7[C]}d=5.19.1i.1k.7.1J.14();1b=d.16(/12\\.([A-Z]{6})\\.([A-Z]{6})\\([a-z]\\);12\\.\\1\\.([A-Z]{6})\\(\\([a-z] \\? 12\\.[A-Z]{6} : 12\\.[A-Z]{6}\\)\\);\\}$/);11 D=1b[2];11 E=1b[3];5.8.9.10.1g.7.2a=5.8.9.10.1g.7[D];5.8.9.10.1g.7.2b=5.8.9.10.1g.7[E]}13(15 5.8.9.10.1r===\'1c\'){d=5.8.9.18.7.1p.14();11 F=d.16(/13\\([a-z]=="1S"\\)\\{1f \\(1d \\$I\\.([A-Z]{6})\\)\\.[A-Z]{6}\\(\\);\\}/)[1];5.8.9.10.1r=$I[F]}13(15 5.8.9.10.1r.7.2d!==\'17\'){d=5.19.2e.2e.7.2v.14();11 G=d.16(/12\\.[A-Z]{6}\\.([A-Z]{6})\\([a-z]\\);/)[1];5.8.9.10.1r.7.2d=5.8.9.10.1r.7[G]}13(15 5.8.9.10.1a===\'1c\'){d=5.8.9.18.7.1p.14();11 H=d.16(/13\\([a-z]=="2f"\\)\\{1f \\(1d \\$I\\.([A-Z]{6})\\)\\.[A-Z]{6}\\(\\);\\}/)[1];5.8.9.10.1a=$I[H]}13(15 5.8.9.10.1a.7.1M!==\'17\'||15 5.8.9.10.1a.7.1N!==\'17\'||15 5.8.9.10.1a.7.1q!==\'17\'){d=5.19.1v.1v.7.2c.14();11 I=d.16(/12\\.[A-Z]{6}\\.[A-Z]{6}\\(\\(1d \\$I\\.[A-Z]{6}\\)\\.[A-Z]{6}\\(12,12\\.([A-Z]{6})\\)\\);/)[1];d=5.19.1v.1v.7[I].14();1b=d.16(/12\\.([A-Z]{6})\\.([A-Z]{6})\\("#2u"\\);12\\.\\1\\.([A-Z]{6})\\("2t"\\);12\\.\\1\\.([A-Z]{6})\\(12\\.[A-Z]{6}\\.14\\(\\)\\);/);11 J=1b[2];11 K=1b[3];11 L=1b[4];5.8.9.10.1a.7.1q=5.8.9.10.1a.7[J];5.8.9.10.1a.7.1N=5.8.9.10.1a.7[K];5.8.9.10.1a.7.1M=5.8.9.10.1a.7[L]}13(15 5.8.9.10.1a.7.2j!==\'17\'||15 5.8.9.10.1a.7.2k!==\'17\'||15 5.8.9.10.1a.7.2l!==\'17\'){11 M={2l:5.8.9.10.1a.7.1q.14().16(/13\\(12\\.([A-Z]{6})!=([A-1Q-z]+)\\)\\{12\\.\\1=\\2;/)[1],2k:5.8.9.10.1a.7.1N.14().16(/13\\(12\\.([A-Z]{6})!=([A-1Q-z]+)\\)\\{12\\.\\1=\\2;/)[1],2j:5.8.9.10.1a.7.1M.14().16(/13\\(12\\.([A-Z]{6})!=([A-1Q-z]+)\\)\\{12\\.\\1=\\2;/)[1]};1O(11 N 1L M){11 O=1d 2r(\'1f 12\\\\.\'+M[N]+\';\');1O(11 P 1L 5.8.9.10.1a.7){13(5.8.9.10.1a.7[P]2p 2N&&O.26(5.8.9.10.1a.7[P].14())){5.8.9.10.1a.7[N]=5.8.9.10.1a.7[P];2q}}}}13(15 5.8.9.10.18===\'1c\'){d=5.8.9.18.7.1p.14();11 Q=d.16(/13\\([a-z]=="2s"\\)\\{1f \\(1d \\$I\\.([A-Z]{6})\\)\\.[A-Z]{6}\\(\\);\\}/)[1];5.8.9.10.18=$I[Q]}13(15 5.8.9.10.18.7.2i!==\'17\'||15 5.8.9.10.18.7.2h!==\'17\'){11 R=e(5.19.1h.1K.7,/"2x"/);d=5.19.1h.1K.7[R].14();11 S=d.16(/12\\.[A-Z]{6}=\\(1d \\$I\\.([A-Z]{6})\\)\\.[A-Z]{6}\\(\\(\\(12\\.[A-Z]{6}\\(\\)==1\\) \\? \\$I\\.[A-Z]{6}\\.2z/)[1];d=5.19.1h.1K.7.2A.14();11 T=d.16(/13\\(\\(12\\.([A-Z]{6})!=1B\\)&&!12\\.[A-Z]{6}\\)\\{12\\.\\1\\.([A-Z]{6})\\(12\\.[A-Z]{6},12\\.[A-Z]{6}\\);\\}/)[2];d=$I[S].7[T].14();1b=d.16(/12\\.([A-Z]{6})\\.([A-Z]{6})\\(c\\);.+11 [a-z]=12\\.\\1\\.([A-Z]{6})\\(\\)\\.2C/);11 U=1b[2];11 V=1b[3];5.8.9.10.18.7.2i=5.8.9.10.18.7[U];5.8.9.10.18.7.2h=5.8.9.10.18.7[V]}13(15 5.8.9.1e===\'1c\'){5.8.9.1e=17(){}}13(15 5.8.9.1e.1j===\'1c\'){d=5.8.9.18.7.1H.14();11 W=d.16(/13\\(a=="1X"\\)\\{1f \\(1d \\$I\\.([A-Z]{6})\\)\\.[A-Z]{6}\\(\\);\\}/)[1];5.8.9.1e.1j=$I[W]}13(15 5.8.9.1e.1j.7.1q!==\'17\'){d=5.19.1h.2I.7.2J.14();11 X=d.16(/\\.([A-Z]{6})\\("#21"\\);/)[1];5.8.9.1e.1j.7.1q=5.8.9.1e.1j.7[X]}13(15 5.8.9.1e.1j.7.1w!==\'17\'){d=5.19.1i.1k.7.1z.14();11 Y=d.16(/\\("#21"\\);12\\.[A-Z]{6}\\.([A-Z]{6})\\(3\\);/)[1];5.8.9.1e.1j.7.1w=5.8.9.1e.1j.7[Y]}}17 1y(){2O{13(15 2P!==\'1c\'){13(!1l.1U||!1l.1I||1l.1I<1P){1V();1l.1U=2T;1l.2U=Z;1l.1I=1P;1R.2n(\'2m v%s 2Y\',Z)}}2Z{2g(1y,29)}}32(e){1R.2n(\'2m: \',e.14())}}2g(1y,29)};11 1x=1Z.35(\'36\');1x.37=\'(\'+20.14()+\')("\'+24+\'", \'+1W+\');\';1x.38=\'2f/39\';1Z.3a(\'3b\')[0].3c(1x)})();',62,199,'|||||ClientLib||prototype|Draw|Scene|||||||||||||||||||||||||||||||||||||||||||||||||||||Element|var|this|if|toString|typeof|match|function|Canvas|Vis|Text|matches|undefined|new|Shader|return|Shape|Region|MouseTool|Pen|SelectSupportTool|window|Effect|BaseEffect|DrawMain|CreateElement|set_Color|Image|View|VisView|CreateScene|City|set_Width|be|waitForGame|Activate|RegionNPCCamp|null|ctor|set_Layer|set_ZOrder|set_X|set_Y|CreateShader|CCTADrawLayerDeobfuscator_VersionId|Check|RegionGhostCity|in|set_Text|set_Font|for|ba|Za|console|image|use|CCTADrawLayerDeobfuscator_IsLoaded|run|bc|pen|Attach|document|bd|00c2f8|Detach|get_Scene|bb|strict|test|calculateTextWidth|set_Height|1000|set_Stops|set_Shader|Init|set_Source|BaseView|text|setTimeout|get_DomElement|set_DomElement|get_Text|get_Font|get_Color|DrawLayerDeobfuscator|log|ArmyDismissArea|instanceof|break|RegExp|canvas|unit_level|FFFFFF|ChangeBackground|Update|region_city_name|FoundBaseTool|Cyan|VisUpdate|call|width|shape|DetachFromScene|AttachToScene|AddSelectionImage|Font|RegionCity|setActiveSupportState|UiUpdate|GetInstance|Dispose|Function|try|qx|ArmySetup|content|by|true|CCTADrawLayerDeobfuscator_Version|method|locate|to|loaded|else|Unable|throw|catch|hasOwnProperty|10002|createElement|script|innerHTML|type|javascript|getElementsByTagName|head|appendChild'.split('|'),0,{}))
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('\'2B 2V\';(B(){u r=B(){\'2B 2V\';B 2s(){2x.2y(\'K 4B\');L.3H.4d(\'K\',{2q:\'4S\',4T:L.1A.5e,3k:{2t:[t.D.E.1N.2Q,t.D.E.1N.2U,t.D.E.1N.3f],3b:{2h:(H t.T.U).$N(0,0,5,7),2H:(H t.T.U).$N(6,0,11,7),2J:(H t.T.U).$N(13,0,14,7),2M:(H t.T.U).$N(2P,1,2T,2),2W:(H t.T.U).$N(38,1,43,2),2Z:(H t.T.U).$N(44,1,49,2),39:(H t.T.U).$N(50,0,55,3),1D:(H t.T.U).$N(56,0,4j,3),2m:(H t.T.U).$N(2P,1,2T,2)},1o:{},V:B(a,b){u c=K.3b[a];u d=K.1o[b];F(H t.T.U).$N(c.X+d.x,c.W+d.y,c.3r+d.x,c.3E+d.y)}},3G:B(a){a.1o[t.O.1x.2S]={x:0,y:0};a.1o[t.O.1x.3J]={x:0,y:18};a.1o[t.O.1x.3N]={x:0,y:36};a.1o[t.O.1x.3S]={x:3T,y:36}},4c:{S:R,1q:R,1z:R,23:R,1L:R,1E:[],4R:{},2k:B(){v.2n();v.2p();1t.1i.10.1B.1U().2z(\'3z\',v.2A,v)},2n:B(){u a,1r;G(J 1t.1i.10.1B.C.28!==\'B\'){a=1t.1i.10.1B.C.3K.M();u b=a.P(/^B \\(([A-2R-z]+)\\)\\{v\\.([A-2R-47]+)=\\1;/)[2];1t.1i.10.1B.C.28=B(){F v[b]}}G(J t.D.E.C.2c!==\'B\'||J t.D.E.C.2e!==\'B\'||J t.D.E.1k.C.1v!==\'B\'||J t.D.E.1p.C.1O!==\'B\'){a=t.D.E.C.4m.M();1r=a.P(/4n \\$I\\.[A-Z]{6}\\.2Q:{.+?u h=v\\.([A-Z]{6})\\.d\\[g\\.([A-Z]{6})\\];G\\(h==R\\){F 2l;}u i=\\(\\(h\\.([A-Z]{6})!=0\\) \\? v\\.([A-Z]{6})\\.d\\[h\\.\\3\\] : R\\);/);u c=1r[1];u d=1r[2];u e=1r[3];u f=1r[4];t.D.E.C.2c=B(){F v[c]};t.D.E.C.2e=B(){F v[f]};t.D.E.1k.C.1v=B(){F v[d]};t.D.E.1p.C.1O=B(){F v[e]}}G(J t.D.E.1c.C.1v!==\'B\'){a=t.O.1w.3h.C.3j.M();u g=a.P(/u [a-z]=v\\.[A-Z]{6}\\.[A-Z]{6}\\(v\\.[A-Z]{6}\\.([A-Z]{6})\\);/)[1];t.D.E.1c.C.1v=B(){F v[g]}}G(J t.D.E.1G.C.Q!==\'B\'){a=t.D.E.C.3m.M();u h=a.P(/F [a-z]\\.([A-Z]{6});\\}$/)[1];t.D.E.1G.C.Q=B(){F v[h]}}G(J t.D.E.1G.C.1n!==\'B\'){a=t.O.1w.2f.C.3B.M();u i=a.P(/F [a-z]\\.([A-Z]{6});/)[1];t.D.E.1G.C.1n=B(){F v[i]}}G(J t.D.E.1p.C.Q!==\'B\'){a=t.D.E.C.3D.M();u j=a.P(/F [a-z]\\.([A-Z]{6});\\}$/)[1];t.D.E.1p.C.Q=B(){F v[j]}}G(J t.D.E.1p.C.1n!==\'B\'){a=t.O.1w.2f.C.3F.M();u k=a.P(/F [a-z]\\.([A-Z]{6});/)[1];t.D.E.1p.C.1n=B(){F v[k]}}G(J t.D.E.1k.C.1j!==\'B\'){a=t.D.E.1k.C.$N.M();u l=a.P(/v\\.([A-Z]{6})=\\(\\([a-z]>>3I\\d+\\)&15\\);/)[1];t.D.E.1k.C.1j=B(){F v[l]}}G(J t.D.E.1k.C.1g!==\'B\'){a=t.O.1w.2f.C.2N.M();u m=a.P(/F v\\.[A-Z]{6}\\.([A-Z]{6});/)[1];t.D.E.1k.C.1g=B(){F v[m]}}G(J t.D.E.1c.C.1j!==\'B\'){a=t.D.E.1c.C.$N.M();u n=a.P(/v\\.([A-Z]{6})=\\(\\(g>>9\\)&15\\);/)[1];t.D.E.1c.C.1j=B(){F v[n]}}G(J t.D.E.1c.C.1g!==\'B\'){a=t.D.E.1c.C.$N.M();u o=a.P(/v\\.([A-Z]{6})=\\(\\(g>>1\\)&3Q\\);/)[1];t.D.E.1c.C.1g=B(){F v[o]}}G(J t.D.E.1F.C.1j!==\'B\'){a=t.D.E.1F.C.$N.M();u p=a.P(/v\\.([A-Z]{6})=\\(\\([a-z]>>3U\\)&15\\);/)[1];t.D.E.1F.C.1j=B(){F v[p]}}G(J t.D.E.1F.C.1g!==\'B\'){a=t.O.1w.46.C.2N.M();u q=a.P(/F v\\.[A-Z]{6}\\.([A-Z]{6});/)[1];t.D.E.1F.C.1g=B(){F v[q]}}},2p:B(){v.1L=H L.48.25.5l().1s({4e:2l,4g:2,4h:2,4i:\'%\'});t.2X.2Y.1b().30().34.21={3a:\'4u "4v"\',c:\'#4A\',w:24,o:R,s:R};v.S=H L.1a.S.2i(H L.1a.2j.5d());v.S.1f(H L.1a.1A.3e().1s({20:6}));v.S.1f(H L.1a.1J.1K(\'3g\').1s({2o:\'3i\',1Z:\'1M-10-2r\'}));v.S.1f(v.1q=H L.1a.S.2i(H L.1a.2j.3l(8)).1s({1Z:\'1M-10-3n\'}));v.S.1f(v.1z=H 1t.1i.3o.3p(\'3q 1u 10 3s\').1s({3t:\'3u-3v\',3w:\'3x\',3y:\'2u\'}));v.1z.2z(\'3A\',v.2v,v);1t.1i.10.1B.1U().3C(v.S,4)},2v:B(){v.1z.2w(\'2u\');u a=v.23;u b=t.O.1P.1b().1Q();u c=b.1W();u d={};1e(u e 1u a.1V){u f=a.1V[e]/a.1m;u g=v.1L.25(f*2C);t.2D.2E.3L(e,d);u x=d.b;u y=d.c;u h=v.2F(g,t.O.1x.2S);h.3M(x*b.2G()+(b.2G()-h.3O().26)/2);h.3P(y*b.2I()+b.2I()/12);c.3R(h);v.1E.1R(h)}},2K:B(){u a=t.O.1P.1b().1Q().1W();1e(u i=0;i<v.1E.2L;i++){a.3V(v.1E[i])}v.1E=[]},2A:B(c){v.1q.3W();v.2K();u d=c.3X().28();G(d.3Y()===t.D.E.3Z.40.41){v.S.42();F}v.S.45();u e=L.1A.1X.1Y();u f=v.2O(d.4a(),d.4b());G(f.1m>0){u g=[];G(f.1l.1I>0){g.1R({1T:e.1D(\'22:4f 1I\'),1d:f.1l.1I/f.1m,1h:3})}1e(u h 1u f.1l.1y){g.1R({1T:f.27.1y[h],1d:f.1l.1y[h]/f.1m,1h:2,1H:-h})}1e(u h 1u f.1l.1C){g.1R({1T:e.1D(\'22:4k:\')+\' \'+f.27.1C[h],1d:f.1l.1C[h]/f.1m,1h:1,1H:h})}g.4l(B(a,b){G(b.1d===a.1d){G(a.1h===b.1h){F b.1H-a.1H}F a.1h-b.1h}F b.1d-a.1d});1e(u i=0;i<g.2L;i++){v.1q.1f(H L.1a.1J.1K(g[i].1T),{29:i,2a:0});v.1q.1f(H L.1a.1J.1K(v.1L.25(g[i].1d*2C)).1s({1Z:\'1M-10-2r\'}),{29:i,2a:1})}v.23=f;v.1z.2w(\'4o\')}1S{v.1q.1f(H L.1a.1J.1K(e.1D(\'22:4p\')),{29:0,2a:0})}},2O:B(a,b){u c=t.D.4q.1b().4r();u d=0;u e=0;u f={};u g={};u h={};u i={};u j={};1e(u x=a-3;x<=a+3;x++){1e(u y=b-3;y<=b+3;y++){u k=c.4s(x,y);G(k===R||K.2t.4t(k.31)===-1){32}u l=k.1j()+0.5;u m=33.4w((x-a)*(x-a)+(y-b)*(y-b));G(m>l){32}u n=k.1g()*(l-m)/l;d+=n;j[t.2D.2E.4x(x,y)]=n;G(k.31===t.D.E.1N.2U){e+=n}1S{u o=c.4y(x,y);u p=o.2c().d[k.1v()];G(!p.1O()){G(!(p.Q()1u g)){g[p.Q()]=0;i[p.Q()]=p.1n()}g[p.Q()]+=n}1S{u q=o.2e().d[p.1O()];G(!(q.Q()1u f)){f[q.Q()]=0;h[q.Q()]=q.1n()}f[q.Q()]+=n}}}}F{1l:{1I:e,1y:f,1C:g},27:{1y:h,1C:i},1m:d,1V:j}},2F:B(a,b){u c=t.O.1P.1b().1Q().1W();u d=t.O.1P.1b().1Q().4z();u e=2b.35(\'37\');u f=c.4C(\'37\',R);f.4D(e);f.4E(4F);f.4G(4H);u g=24;u h=d.4I(\'21\',a);h+=h%2;e.26=h+12;e.20=g+12;u i=t.T.4J.4K.1b().4L(\'4M/4N/1i/4O.4P\');u j=e.4Q(\'2d\');u k=K.V(\'39\',b);j.17(i,k.X,k.W,k.19(),k.Y(),0,0,6,4);k=K.V(\'2W\',b);j.17(i,k.X,k.W,k.19(),k.Y(),0,4,6,g);k=K.V(\'2h\',b);j.17(i,k.X,k.W,k.19(),k.Y(),0,4+g,6,8);k=K.V(\'2m\',b);j.17(i,k.X,k.W,k.19(),k.Y(),6,0,h,4);k=K.V(\'2M\',b);j.17(i,k.X,k.W,k.19(),k.Y(),6,4,h,g);k=K.V(\'2J\',b);j.17(i,k.X,k.W,k.19(),k.Y(),6,4+g,h,8);k=K.V(\'1D\',b);j.17(i,k.X,k.W,k.19(),k.Y(),6+h,0,6,4);k=K.V(\'2Z\',b);j.17(i,k.X,k.W,k.19(),k.Y(),6+h,4,6,g);k=K.V(\'2H\',b);j.17(i,k.X,k.W,k.19(),k.Y(),6+h,4+g,6,8);u l=t.2X.2Y.1b().30().34.21;j.2o=l.3a;j.4U=l.c;j.4V=\'4W\';j.4X=\'4Y\';j.4Z(a,6+33.51(h/2),16);f.52(e.26);f.53(e.20);F f}}})}B 2g(){57{G(J L!==\'58\'&&L.1A.1X.1Y()&&L.1A.1X.1Y().59&&5a.5b>=5c){2s();K.1U().2k()}1S{3c(2g,3d)}}5f(e){2x.2y(\'K: \',e.M())}}3c(2g,3d)};u s=2b.35(\'5g\');s.5h=\'(\'+r.M()+\')();\';s.2q=\'1M/5i\';2b.5j(\'5k\')[0].54(s)})();',62,332,'|||||||||||||||||||||||||||||ClientLib|var|this||||||function|prototype|Data|WorldSector|return|if|new||typeof|InfluenceMeter|qx|toString|ctor|Vis|match|get_Id|null|container|Draw|Segment|GetDrawSegment|y1|x1|get_Height||region|||||||drawImage||get_Width|ui|GetInstance|WorldObjectRuin|influence|for|add|get_Level|priority|gui|get_TerritoryRadius|WorldObjectCity|groups|total|get_Name|PlateColorSegmentOffsets|Player|influenceTable|matches|set|webfrontend|in|get_PlayerDataId|Region|EBackgroundPlateColor|alliances|regionDisplayLink|core|RegionPointOfInterestStatusInfo|players|tr|regionTextElements|WorldObjectNPCBase|Alliance|weight|forgotten|basic|Label|influenceFormat|text|ObjectType|get_AllianceDataId|VisMain|get_Region|push|else|name|getInstance|objects|get_Scene|Init|getApplication|textColor|height|region_influence_meter|tnf|currentInfluences||format|width|names|getObject|row|column|document|get_Players||get_Alliances|RegionCity|waitForGame|bl|Composite|layout|initialize|false|ts|initializeHacks|font|initializeUserInterface|type|value|createInfluenceMeter|WorldObjectTypes|excluded|onRegionDisplayLinkClick|setVisibility|console|log|addListener|onStatusInfoAppear|use|100|Base|MathUtil|createRegionText|get_GridWidth|br|get_GridHeight|bs|cleanUpRegionTextElements|length|fs|get_BaseLevel|calculateInfluences|63|City|Za|Black|64|NPCBase|strict|ls|Res|ResMain|rs|GetGamedata|Type|continue|Math|fonts|createElement||canvas||tl|css|DrawSegments|setTimeout|1000|Spacer|Ruin|Influence|RegionRuin|font_size_14|get_AllianceId|statics|Grid|GetPlayerAllianceId|tooltip|widgets|SelectableLabel|Display|x2|view|appearance|clickable|link|cursor|pointer|visibility|appear|click|get_AllianceName|addAt|GetPlayerId|y2|get_PlayerName|defer|Class|0x|White|setObject|DecodeCoordId|set_X|Cyan|get_DomElement|set_Y|0xff|Attach|Orange|66|0x12|Detach|removeAll|getTarget|get_Type|WorldObjectPointOfInterest|EPOIType|TunnelExit|exclude|||show|RegionNPCBase|z_|util||get_RawX|get_RawY|members|define|groupingUsed|the|minimumFractionDigits|maximumFractionDigits|postfix|61|player|sort|SetDetails|case|visible|none|MainData|get_World|GetObjectFromPosition|indexOf|24pt|Arial|sqrt|EncodeCoordId|GetWorldSectorByCoords|get_View|FF3333|loaded|CreateElement|set_DomElement|set_Layer|98|set_ZOrder|10000|calculateTextWidth|Html|ImageCache|GetImage|baseview|neutral|font_backdrop_atlas|png|getContext|drawSegments|singleton|extend|fillStyle|textAlign|center|textBaseline|middle|fillText||floor|set_Width|set_Height|appendChild|||try|undefined|initDone|window|CCTADrawLayerDeobfuscator_VersionId|101|VBox|Object|catch|script|innerHTML|javascript|getElementsByTagName|head|NumberFormat'.split('|'),0,{}))
}