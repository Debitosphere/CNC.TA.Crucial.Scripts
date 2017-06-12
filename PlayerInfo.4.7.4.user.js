// ==UserScript==
// @name          CnC:TA MemberStats 4
// @version       4.7.4
// @namespace     https://www.member-stats.de
// @homepage      https://www.member-stats.de
// @description   Sammelt Informationen ueber Basenausbau der Allianzmitglieder (basierend auf Skripte / Routinen von neobsen, JimBeamJD, KRS_L und Dooki)
// @author        F.D
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @icon          https://www.memberstats.de/link/data/favicon.ico
// @copyright     2016, F.D
// @license       CC BY-NC-SA 4.0 - http://creativecommons.org/licenses/by-nc-sa/4.0/
// ==/UserScript==
(function () {
    var MeSt_mainFunction = function () {
            function Y() {
                var h = {};
                Array.isarray || (Array.isarray = function (c) {
                    return c instanceof Array ? !0 : !1
                });
                Object.isobj || (Object.isobj = function (c) {
                    return c instanceof Object && !0 !== c instanceof Array ? !0 : !1
                });
                JSON.isjson || (JSON.isjson = function (c) {
                    try {
                        return JSON.parse(c), "parse"
                    } catch (f) {
                        try {
                            return JSON.stringify(c), "stringify"
                        } catch (b) {
                            return !1
                        }
                    }
                });
                qx.Class.define("MeStmain", {
                    type: "singleton",
                    extend: qx.core.Object,
                    construct: function () {
                        this.mainMenuContent = new qx.ui.menu.Menu;
                        this.mainMenuButton = new qx.ui.form.MenuButton("MeSt", null, this.mainMenuContent);
                        this.mainMenuButton.set({
                            width: 70,
                            appearance: "button-bar-right",
                            toolTipText: "List of MemberStatsCommands"
                        });
                        this.mainMenuButton.addListener("execute", function (b) {
                            this.mainMenuContent.open()
                        }, this);
                        for (var c = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU), f = c.getChildren()[1].getChildren(), b = f.length - 1; 0 <= b; b--) "function" === typeof f[b].setAppearance && "button-bar-right" == f[b].getAppearance() &&
                            f[b].setAppearance("button-bar-center");
                        c.getChildren()[1].add(this.mainMenuButton);
                        c.getChildren()[0].setScale(!0);
                        c.getChildren()[0].setWidth(834)
                    },
                    members: {
                        mainMenuContent: null,
                        mainMenuButton: null,
                        poiwindow: null,
                        poiInfoWindow: null,
                        AddMainMenu: function (c, f, b) {
                            null === c ? k("MeSt.AddSubMenu: name empty") : null === f ? k("MeSt.AddMainMenu: command empty") : (null !== b ? (b = new qx.ui.command.Command(b), b.addListener("execute", f), c = new qx.ui.menu.Button(c, null, b)) : (c = new qx.ui.menu.Button(c), c.addListener("execute",
                                f)), this.mainMenuContent.add(c))
                        },
                        AddSubMainMenu: function (c) {
                            if (null === c) k("Mest.AddSubMainMenu: name empty");
                            else {
                                var f = new qx.ui.menu.Menu;
                                c = new qx.ui.menu.Button(c, null, null, f);
                                this.mainMenuContent.add(c);
                                return f
                            }
                        },
                        AddSubMenu: function (c, f, b, d) {
                            if (null === f) k("MeSt.AddSubMenu: name empty");
                            else if (null === b) k("MeSt.AddSubMenu: command empty");
                            else if (null === c) k("MeSt.AddSubMenu: subMenu empty");
                            else return null !== d ? (d = new qx.ui.form.Button(d), d.addListener("execute", b), d = new qx.ui.menu.Button(f,
                                null, d)) : (d = new qx.ui.menu.Button(f), d.addListener("execute", b)), c.add(d), c = new qx.ui.menu.Menu, new qx.ui.menu.Button(f, null, null, c), c
                        },
                        initialize: function () {
                            try {
                                var c = ClientLib.Data.MainData.GetInstance();
                                c.get_Player().get_Name();
                                c.get_Server().get_WorldId();
                                c.get_Alliance().get_Id();
                                addEventListener("keyup", this.onKey, !1);
                                k("init done");
                                MeStmain.getInstance().doAtLogin();
                                MeStmain.getInstance().doAfter();
                                Array.isArray || (Array.isArray = function (c) {
                                    return "[object Array]" === Object.prototype.toString.call(c)
                                });
                                Object.isObj || (Object.isObj = function (c) {
                                    return "[object Object]" === Object.prototype.toString.call(c)
                                })
                            } catch (f) {
                                k(f)
                            }
                        },
                        onKey: function (c) {},
                        doMenu: function () {
                            var c = MeStmain.getInstance(),
                                f = c.AddSubMainMenu("MainOptions");
                            c.AddSubMenu(f, "open Memberstats.de", function () {
                                MeStmain.getInstance().openurl()
                            });
                            c.AddSubMenu(f, "send BaseData", function () {
                                MeStmain.getInstance().doAfter()
                            }, "ALT+y");
                            !0 === ClientLib.Data.MainData.GetInstance().get_Alliance().get_IsAdmin() && (f = c.AddSubMainMenu("State of War"), c.AddSubMenu(f,
                                "set State of War",
                                function () {
                                    MeStmain.getInstance().remoteRequest("stateofwar")
                                }, "ALT+p"), c.AddSubMenu(f, "unset State of War", function () {
                                MeStmain.getInstance().remoteRequest("unsetstateofwar")
                            }, "ALT+o"))
                        },
                        doAtLogin: function () {
                            this.checkWar();
                            this.doMenu();
                            this.isPoiMinister()
                        },
                        doAfter: function () {
                            MeStmain.getInstance().checkVersion();
                            MeStmain.getInstance().PlayerUpdate()
                        },
                        checkWar: function () {
                            MeStmain.getInstance().getIsWar()
                        },
                        checkVersion: function () {
                            MeStmain.getInstance().remoteRequest("version")
                        },
                        openurl: function () {
                            MeStmain.getInstance().remoteRequest("new_check")
                        },
                        askOtherButton: function () {
                            MeStmain.getInstance().remoteRequest("button_check")
                        },
                        setSubstitution: function (c, f) {
                            MeStmain.getInstance().substitutionXhr("set", f, c)
                        },
                        removeSubstitution: function (c, f) {
                            MeStmain.getInstance().substitutionXhr("unset", c, f)
                        },
                        poiInfo: function () {
                            MeStmain.getInstance().getWindow().open();
                            this.getWindow().push("Create PoiInfo\nplease wait\n\n");
                            MeStmain.getInstance().getPoiInfo()
                        },
                        isPoiMinister: function () {
                            k("check if poiminister");
                            MeStmain.getInstance().remoteRequest("poiminister")
                        },
                        substitutionXhr: function (c, f, b) {
                            var d = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId(),
                                g = ClientLib.Net.CommunicationManager.GetInstance().get_InstanceId(),
                                q = new qx.bom.request.Xhr;
                            "set" == c && (q.onload = function () {
                                "0" == q.responseText && k("WarSubstitution is set!");
                                "1" == q.responseText && k("WarSubstitution is Error!");
                                if ("2" == q.responseText) {
                                    q.abort();
                                    k("substitution ist nicht richtig gesetzt");
                                    var c = ClientLib.Data.MainData.GetInstance().get_PlayerSubstitution().getOutgoing();
                                    c.n !== b && (k("Substitution to " + c.n + " delet"), c = '{"session":"' + g + '","id":"' + c.i + '","pid":"' + c.p1 + '"}', MeStmain.getInstance().removeSubstitution(c, b))
                                }
                                "3" == q.responseText && k("WarSubstitution Account nicht auf dieser Welt!");
                                "4" == q.responseText && k("WarSubstitution kann nicht auf eigenen account gesetzt werden!")
                            }, q.open("POST", "/" + d + "/Presentation/Service.svc/ajaxEndpoint/SubstitutionCreateReq"), q.setRequestHeader("Content-Type", "application/json"), q.send(f));
                            "unset" == c && (q.onload = function () {
                                if ("0" ==
                                    q.responseText) {
                                    var c = '{"session":"' + ClientLib.Net.CommunicationManager.GetInstance().get_InstanceId() + '","name":"' + b + '"}';
                                    MeStmain.getInstance().setSubstitution(b, c)
                                }
                            }, q.open("POST", "/" + d + "/Presentation/Service.svc/ajaxEndpoint/SubstitutionCancelReq"), q.setRequestHeader("Content-Type", "application/json"), q.send(f))
                        },
                        getIsWar: function () {
                            k("Check if is War");
                            "true" !== B.get_IsSubstituteLogin() ? (k("Player is not substitutionLogin"), MeStmain.getInstance().remoteRequest("war")) : k("Player is substitutionLogin")
                        },
                        PlayerUpdate: function () {
                            var c = ClientLib.Data.MainData.GetInstance();
                            c.get_Player().get_Name();
                            var f = c.get_Alliance(),
                                b = c.get_Player().get_Id();
                            c.get_Server();
                            ClientLib.Net.CommunicationManager.GetInstance().get_InstanceId();
                            f.get_OwnedPOIs();
                            ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfo", {
                                id: b
                            }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, Z), null)
                        },
                        remoteRequest: function (c, f) {
                            var b = ClientLib.Data.MainData.GetInstance(),
                                d = b.get_Player().get_Name(),
                                g = b.get_Alliance(),
                                q = b.get_Player().get_Id(),
                                b = b.get_Server(),
                                p = ClientLib.Net.CommunicationManager.GetInstance().get_InstanceId(),
                                m = g.get_OwnedPOIs(),
                                l = new qx.io.remote.Request("https://www.member-stats.de/task/index.php", "POST", "text/html");
                            l.setTimeout(3E3);
                            l.setProhibitCaching(!1);
                            l.setRequestHeader("Content-Type", "text/html");
                            l.setTimeout("3600000");
                            l.setResponseType("text/html");
                            l._ontimeout = function () {
                                l.abort();
                                k("req abort")
                            };
                            "version" == c && (k("version check"), l.setData("version"), l.setParameter("version",
                                "4.7.4"), l.addListener("completed", function (b) {
                                "version" === b.getContent() ? (k("UPDATE is vorhanden"), MeStmain.getInstance().UpdateWindow()) : k("Kein Script Update")
                            }), l.send());
                            "update" == c && (l.setData("UPDATE"), l.setParameter("update", "1"), console.log("PlayerInfoData= null ______________________"), MeStmain.getInstance().Playerinfo(l, f), l.addListener("completed", function (b) {
                                k("PlayerDataUpdate");
                                "UPDATED" === b.getContent() && k("PlayerData Up To Date")
                            }));
                            "new_check" == c && (l.setData("new_check"), l.setParameter("new_check",
                                d), l.addListener("completed", function (b) {
                                "" === b.getContent() ? (k("new Account:: " + b.getContent()), MeStmain.getInstance().winOpen("", d)) : (k("NOT new :: " + b.getContent()), MeStmain.getInstance().winOpen("", ""))
                            }), l.send());
                            "war" == c && (l.setData("WAR"), l.setParameter("name", d), l.setParameter("alli", g.get_Id()), l.setParameter("world", b.get_WorldId()), l.addListener("completed", function (b) {
                                var c = '{"session":"' + p + '","name":"' + b.getContent() + '"}';
                                if ("" !== b.getContent() && d !== b.getContent() && !0 !== ClientLib.Data.MainData.GetInstance().get_Player().get_IsSubstituteLogin()) {
                                    var f =
                                        ClientLib.Data.MainData.GetInstance().get_PlayerSubstitution().getOutgoing();
                                    null !== f ? (k(f), f.n !== b.getContent() && MeStmain.getInstance().MeStUvWindow(b.getContent(), c)) : MeStmain.getInstance().MeStUvWindow(b.getContent(), c)
                                } else k("No War")
                            }), l.send());
                            if ("stateofwar" == c) {
                                l.setData("stateofwar");
                                l.setParameter("stateofwar", d);
                                l.setParameter("token", q);
                                l.setParameter("alli", g.get_Id());
                                l.setParameter("world", b.get_WorldId());
                                l.addListener("completed", function (b) {
                                    "stateofwar" === b.getContent() ? (k("State of War is set"),
                                        MeStmain.getInstance().stateofwarwin(d, "set")) : k("State of War ERROR :: " + b.getContent())
                                });
                                var h = ClientLib.Data.MainData.GetInstance().get_Alliance().get_IsAdmin();
                                !0 === h ? l.send() : k("State of War ERROR :: You are no admin!")
                            }
                            "unsetstateofwar" == c && (l.setData("unsetstateofwar"), l.setParameter("unsetstateofwar", d), l.setParameter("token", q), l.setParameter("alli", g.get_Id()), l.setParameter("world", b.get_WorldId()), l.addListener("completed", function (b) {
                                "unsetstateofwar" === b.getContent() ? (k("State of War is unset"),
                                    MeStmain.getInstance().stateofwarwin(d, "unset")) : k("State of War ERROR :: " + b.getContent())
                            }), h = ClientLib.Data.MainData.GetInstance().get_Alliance().get_IsAdmin(), !0 === h ? l.send() : k("State of War ERROR :: You are no admin!"));
                            "poiminister" == c && (l.setData("poiminister"), l.setParameter("poiminister", d), l.setParameter("token", q), l.setParameter("alli", g.get_Id()), l.setParameter("world", b.get_WorldId()), l.addListener("completed", function (b) {
                                b.getContent() === d ? "0" < m.length ? (k("you are PoiMinister"), MeStmain.getInstance().AddMainMenu("PoiInfo",
                                    function () {
                                        MeStmain.getInstance().poiInfo()
                                    }, "ALT+x")) : k("you are PoiMinister but alli have 0 Poi's ") : k("you are not PoiMinister :: " + b.getContent())
                            }), l.send())
                        },
                        Playerinfo: function (c, f) {
                            qx.core.Init.getApplication().getBackgroundArea().closeCityInfo();
                            var b = ClientLib.Data.MainData.GetInstance(),
                                d;
                            d = b.get_Alliance().get_MemberDataAsArray();
                            var g = b.get_Server().get_Name().trim(),
                                q = b.get_Server().get_WorldId(),
                                p = b.get_Cities(),
                                m = p.get_CurrentOwnCity().get_AllianceName(),
                                p = p.get_CurrentOwnCity().get_AllianceId();
                            c.setFormField("version", "4.7.4");
                            c.setFormField("worldId", q);
                            c.setFormField("serverName", g);
                            c.setFormField("allianceId", p);
                            c.setFormField("allianceName", m);
                            c.setFormField("count", d.length);
                            for (g = 0; g < d.length; g++) q = d[g].Id, m = d[g].Name, p = d[g].RoleName, c.setFormField("playerId" + g, q), c.setFormField("name" + g, m), c.setFormField("ro" + g, p);
                            d = b.get_Cities();
                            q = d.get_CurrentOwnCity().get_PlayerId();
                            c.setFormField("currentplayerId", q);
                            q = ClientLib.Data.MainData.GetInstance().get_Player().accountId;
                            c.setFormField("accountId",
                                q);
                            q = ClientLib.Data.MainData.GetInstance().get_Alliance().get_FirstLeaders().l;
                            m = ClientLib.Data.MainData.GetInstance().get_Alliance().get_SecondLeaders().l;
                            c.setFormField("cic", q);
                            c.setFormField("sc", m);
                            q = d.get_CurrentOwnCity().get_PlayerName();
                            c.setFormField("currentplayerName", q);
                            q = f.c.length;
                            c.setFormField("basecount", q);
                            c.setFormField("fraction", f.f);
                            c.setFormField("basekills", f.bd);
                            c.setFormField("pvekills", f.bde);
                            c.setFormField("pvpkills", f.bd - f.bde);
                            c.setFormField("points", f.p);
                            c.setFormField("rank",
                                f.r);
                            c.setFormField("hascode", f.hchc);
                            c.setFormField("maxcp", B.GetCommandPointMaxStorage());
                            c.setFormField("actcp", Math.round(B.GetCommandPointCount()));
                            c.setFormField("funds", b.get_Inventory().get_PlayerFunds());
                            c.setFormField("schirme", Math.round(B.GetSupplyPointCount()));
                            c.setFormField("RPoints", B.get_ResearchPoints());
                            c.setFormField("CreditsCount", Math.round(B.GetCreditsCount()));
                            b = ClientLib.Data.MainData.GetInstance().get_Player();
                            m = b.get_Faction();
                            m = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound,
                                m);
                            m = b.get_PlayerResearch().GetResearchItemFomMdbId(m).get_NextLevelInfo_Obj();
                            b = [];
                            for (g in m.rr) 0 < m.rr[g].t && (b[m.rr[g].t] = m.rr[g].c);
                            g = b[ClientLib.Base.EResourceType.Gold];
                            b = b[ClientLib.Base.EResourceType.ResearchPoints];
                            m = B.get_Credits();
                            m = (m.Delta + m.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                            g = (g - B.GetCreditsCount()) / m;
                            c.setFormField("timeTOmcv", Math.round(3600 * g));
                            c.setFormField("rpNeeded", b);
                            for (g = 0; g < q; g++) {
                                var m = d.GetCity(f.c[g].i),
                                    l, b = [];
                                b.Id = f.c[g].i;
                                b.Na = m.get_Name();
                                b.Po = f.c[g].p;
                                b.Lvl = m.get_LvlBase().toFixed(2);
                                b.Off = m.get_LvlOffense().toFixed(2);
                                b.Def = m.get_LvlDefense().toFixed(2);
                                b.PosX = f.c[g].x;
                                b.PosY = f.c[g].y;
                                p = m.get_CityUnitsData();
                                b.repInf = 0 < b.Off ? p.GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, !1) : 0;
                                b.repVeh = 0 < b.Off ? p.GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, !1) : 0;
                                b.repAir = 0 < b.Off ? p.GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, !1) : 0;
                                b.maxRep = 0 < b.Off ? m.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf) :
                                    0;
                                b.availRep = 0 < b.Off ? ClientLib.Base.Resource.GetResourceCount(m.get_RepairOffenseResources().get_RepairChargeOffense()) : 0;
                                l = m.get_SupportWeapon();
                                b.supWp = null !== l ? l.n : "";
                                l = m.get_SupportData();
                                b.SL = null !== l ? l.get_Level() : 0;
                                p = m.get_CityBuildingsData();
                                l = p.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                                b.CY = null !== l ? l.get_CurrentLevel() : 0;
                                l = p.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                                b.DF = null !== l ? l.get_CurrentLevel() : 0;
                                l = p.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_HQ);
                                b.DHQ = null !== l ? l.get_CurrentLevel() : 0;
                                b.PP = Math.round(m.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, !1, !1));
                                b.PBP = Math.round(m.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power));
                                b.PAB = ClientLib.Data.MainData.GetInstance().get_Alliance().GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                b.CP = Math.round(ClientLib.Base.Resource.GetResourceGrowPerHour(m.get_CityCreditsProduction(), !1));
                                b.CBP = Math.round(ClientLib.Base.Resource.GetResourceBonusGrowPerHour(m.get_CityCreditsProduction(), !1));
                                b.Tall = Math.round(m.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, !1, !1) + m.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium) + ClientLib.Data.MainData.GetInstance().get_Alliance().GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium));
                                b.Call = Math.round(m.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, !1, !1) + m.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal) + ClientLib.Data.MainData.GetInstance().get_Alliance().GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal));
                                b.PPall = b.PP + b.PBP + b.PAB;
                                b.CPall = b.CP + b.CBP;
                                c.setFormField("basename" + g, b.Na);
                                c.setFormField("punkte" + g, b.Po);
                                c.setFormField("level" + g, b.Lvl);
                                c.setFormField("off" + g, b.Off);
                                c.setFormField("def" + g, b.Def);
                                c.setFormField("repinf" + g, b.repInf);
                                c.setFormField("repveh" + g, b.repVeh);
                                c.setFormField("repair" + g, b.repAir);
                                c.setFormField("repmax" + g, b.maxRep);
                                c.setFormField("availrep" + g, b.availRep);
                                c.setFormField("suptype" + g, b.supWp);
                                c.setFormField("suplvl" + g, b.SL);
                                c.setFormField("cylvl" + g, b.CY);
                                c.setFormField("dflvl" +
                                    g, b.DF);
                                c.setFormField("dfhqlvl" + g, b.DHQ);
                                c.setFormField("power" + g, b.PPall);
                                c.setFormField("tib" + g, b.Tall);
                                c.setFormField("cris" + g, b.Call);
                                c.setFormField("cash" + g, b.CPall);
                                c.setFormField("x" + g, b.PosX);
                                c.setFormField("y" + g, b.PosY);
                                V(b.Id, g, c)
                            }
                            console.log("de funk werd aufgruafa");
                            c.send()
                        },
                        stateofwarwin: function (c, f) {
                            var b = new qx.ui.window.Window("Alliance on war");
                            if ("set" == f) var d = 'You "' + c + '" have set State of War',
                                g = "Set State of War";
                            "unset" == f && (d = 'You "' + c + '" have delet State of War', g = "UnSet State of War");
                            b.set({
                                caption: g,
                                icon: "webfrontend/ui/common/icon_moral_alert_red.png",
                                layout: new qx.ui.layout.HBox(4),
                                width: 250,
                                height: 75,
                                contentPaddingTop: 0,
                                contentPaddingBottom: 6,
                                contentPaddingRight: 6,
                                contentPaddingLeft: 6,
                                showMaximize: !1,
                                showMinimize: !1,
                                allowMaximize: !1,
                                allowMinimize: !1,
                                resizable: !1,
                                visibility: "visible",
                                textColor: "#bfbfbf"
                            });
                            b.setPadding(10);
                            b.setLayout(new qx.ui.layout.VBox(10));
                            g = new qx.ui.container.Composite((new qx.ui.layout.VBox(4)).set({
                                alignX: "left"
                            }));
                            g.add(new qx.ui.basic.Label(d));
                            var d =
                                new qx.ui.container.Composite((new qx.ui.layout.VBox(1)).set({
                                    alignX: "center"
                                })),
                                q = new qx.ui.form.Button("close");
                            q.set({
                                toolTipText: "close",
                                width: 70,
                                height: 20,
                                maxWidth: 200,
                                maxHeight: 32,
                                center: !0,
                                rich: !0
                            });
                            d.add(q);
                            q.addListener("execute", function (c) {
                                b.close()
                            }, this);
                            b.add(g);
                            b.add(d);
                            b.center();
                            b.open()
                        },
                        MeStUvWindow: function (c, f) {
                            var b = new qx.ui.window.Window("Alliance on war"),
                                d = "Your commander has declared war status!|It was sent a substitution to:|" + c;
                            b.set({
                                caption: "Alliance on war",
                                icon: "webfrontend/ui/common/icon_moral_alert_red.png",
                                layout: new qx.ui.layout.HBox(4),
                                width: 300,
                                height: 150,
                                contentPaddingTop: 0,
                                contentPaddingBottom: 6,
                                contentPaddingRight: 6,
                                contentPaddingLeft: 6,
                                showMaximize: !1,
                                showMinimize: !1,
                                allowMaximize: !1,
                                allowMinimize: !1,
                                resizable: !1,
                                visibility: "visible",
                                textColor: "#bfbfbf"
                            });
                            b.setPadding(10);
                            b.setLayout(new qx.ui.layout.VBox(10));
                            var g = new qx.ui.container.Composite((new qx.ui.layout.VBox(4)).set({
                                    alignX: "left"
                                })),
                                q = new qx.ui.container.Composite((new qx.ui.layout.VBox(1)).set({
                                    alignX: "center"
                                })),
                                p = new qx.ui.form.Button("send Substitution"),
                                m = new qx.ui.form.Button("abort");
                            p.set({
                                toolTipText: "send Substitution",
                                width: 120,
                                height: 20,
                                maxWidth: 200,
                                maxHeight: 32,
                                center: !0,
                                rich: !0
                            });
                            m.set({
                                toolTipText: "dont send substitution",
                                width: 120,
                                height: 20,
                                maxWidth: 200,
                                maxHeight: 32,
                                center: !0,
                                rich: !0
                            });
                            q.add(p);
                            q.add(m);
                            p.addListener("execute", function (d) {
                                b.close();
                                MeStmain.getInstance().substitutionXhr("set", f, c)
                            }, this);
                            m.addListener("execute", function (c) {
                                b.close()
                            }, this);
                            d = d.split("|");
                            for (i = 0;
                                "3" > i; i++) g.add(new qx.ui.basic.Label(d[i]));
                            b.add(g);
                            b.add(q);
                            b.center();
                            b.open()
                        },
                        UpdateWindow: function () {
                            var c = new qx.ui.window.Window("MemberStats Update!");
                            c.set({
                                caption: "MemberStats Update!",
                                icon: "webfrontend/ui/common/icon_moral_alert_red.png",
                                layout: new qx.ui.layout.HBox(4),
                                width: 450,
                                height: 170,
                                contentPaddingTop: 0,
                                contentPaddingBottom: 6,
                                contentPaddingRight: 6,
                                contentPaddingLeft: 6,
                                showMaximize: !1,
                                showMinimize: !1,
                                allowMaximize: !1,
                                allowMinimize: !1,
                                resizable: !0,
                                visibility: "excluded",
                                textColor: "#bfbfbf"
                            });
                            c.setPadding(10);
                            c.setLayout(new qx.ui.layout.VBox(10));
                            var f = new qx.ui.container.Composite((new qx.ui.layout.VBox(2)).set({
                                    alignX: "left"
                                })),
                                b = new qx.ui.basic.Label('MemberStatsScript "4.7.4" is to old');
                            f.add(b);
                            b = new qx.ui.basic.Label("Please disable/deinstall the old script and get new version");
                            f.add(b);
                            b = new qx.ui.basic.Label("");
                            f.add(b);
                            b = new qx.ui.basic.Label("Click button below to open link to get new version");
                            f.add(b);
                            var b = new qx.ui.container.Composite((new qx.ui.layout.VBox(2)).set({
                                    alignX: "right"
                                })),
                                d = new qx.ui.form.Button("Get new Script");
                            b.add(d);
                            d.addListener("execute", function () {
                                c.close();
                                qx.core.Init.getApplication().showExternal("https://www.member-stats.de/?link=new_version", ".member-stats")
                            }, this);
                            c.add(f);
                            c.add(b);
                            c.center();
                            c.open()
                        },
                        getPoiInfo: function () {
                            function c(b, c) {
                                try {
                                    var f = c.c;
                                    J = {};
                                    for (var d in f) {
                                        var g = f[d];
                                        J[d] = {};
                                        J[d].x = g.x;
                                        J[d].y = g.y;
                                        J[d].n = g.n;
                                        H.push([J[d].n, J[d].x, J[d].y, c.n])
                                    }
                                } catch (w) {
                                    k("onPlayerInfo: ", w)
                                }
                            }
                            r = [];
                            H = [];
                            var f = ClientLib.Data.MainData.GetInstance(),
                                b = f.get_Alliance().get_OwnedPOIs(),
                                d = b.length,
                                g = this.getWindow();
                            g.push("search all Pois from Alliance\n");
                            for (var q = 0; q < d; q++) {
                                if (null !== b[q] && "undefined" !== b[q]) {
                                    var p = phe.cnc.gui.util.Text.getPoiInfosByType(b[q].t).name,
                                        m = b[q].t,
                                        l = b[q].l,
                                        h = b[q].i,
                                        G = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(b[q].l),
                                        C = phe.cnc.gui.util.Numbers.formatCoordinates(b[q].x, b[q].y);
                                    r.push([h, p, l, G, b[q].x, b[q].y, C, m])
                                }
                                if (q + 1 == d)
                                    for (k("AlliancePois scanned"), g.push("AlliancePois scanned\n"), p = [], p = f.get_Alliance().get_MemberDataAsArray(), g.push("search all Playerbases\n"),
                                        m = 0; m < p.length; m++) W = p[m].Name, ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfoByName", {
                                        name: W
                                    }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, c), !0), m + 1 === p.length && (k("save all Playerbases"), g.push("all Playerbases saved\n"), MeStmain.getInstance().getBasesOnPoi())
                            }
                        },
                        getBasesOnPoi: function () {
                            k("scan if Playerbase is in range of a AlliancePoi");
                            var c = this.getWindow();
                            c.push("scan if Playerbase is in range of a AlliancePoi\n");
                            D = [];
                            ClientLib.Data.MainData.GetInstance().get_Alliance().get_MemberDataAsArray();
                            window.setTimeout(function () {
                                for (var f = 0; f < H.length; f++) {
                                    for (var b = 0; b < r.length; b++) {
                                        var d = Math.abs(H[f][1] - r[b][4]),
                                            g = Math.abs(H[f][2] - r[b][5]);
                                        2 < d || 2 < g || 2 == d && 2 == g || D.push([r[b][0], r[b][1], r[b][2], r[b][3], r[b][6], H[f][0], H[f][3], r[b][4], r[b][5], r[b][7]])
                                    }
                                    f + 1 === H.length && b === r.length && (k("Scan complete"), c.push("Scan complete\n"), MeStmain.getInstance().SendPoiInfo())
                                }
                            }, 2E3)
                        },
                        SendPoiInfo: function () {
                            var c = this.getWindow();
                            c.push("Preparing to Send PoiInfo to Memberstats.de\n");
                            k("Preparing to Send PoiInfo");
                            window.setTimeout(function () {
                                function f() {
                                    b.addListener("completed", function (b) {
                                        "" !== b.getContent() ? (k("hab was bekommen " + b.getContent()), c.push("complete Send PoiInfo to Memberstats.de\n"), "none" != MeStmain.getInstance().getForumId() ? (b = MeStmain.getInstance().getForumId(), MeStmain.getInstance().PoiForum(D, b)) : MeStmain.getInstance().CreatePoiForum(D)) : k("hab nix bekommen " + b.getContent())
                                    });
                                    b.send()
                                }
                                var b = new qx.io.remote.Request("https://www.member-stats.de/poi/", "POST", "text/html");
                                b.setProhibitCaching(!1);
                                b.setRequestHeader("Content-Type", "text/html");
                                b.setTimeout("3600000");
                                b.setResponseType("text/html");
                                if (null !== D) {
                                    var d = ClientLib.Data.MainData.GetInstance(),
                                        g = d.get_Server().get_WorldId(),
                                        d = d.get_Alliance().get_Id();
                                    b.setFormField("worldId", g);
                                    b.setFormField("allianceId", d);
                                    b.setData("PoiData");
                                    b.setParameter("version", "4.7.4");
                                    b.setFormField("count", D.length);
                                    for (g = 0; g < D.length; g++) b.setFormField("id" + g, D[g][0]), b.setFormField("name" + g, D[g][1]), b.setFormField("level" + g, D[g][2]), b.setFormField("score" +
                                        g, D[g][3]), b.setFormField("coords" + g, D[g][4]), b.setFormField("playerBase" + g, D[g][5]), b.setFormField("player" + g, D[g][6]), b.setFormField("x" + g, D[g][7]), b.setFormField("y" + g, D[g][8]), b.setFormField("type" + g, D[g][9]), g + 1 === D.length && (k("Send PoiInfo to https://www.member-stats.de"), window.setTimeout(f, 1E3))
                                }
                            }, 2E3)
                        },
                        winOpen: function (c, f) {
                            var b = MeStScanner.Layout.window.getInstance(),
                                d = "https://www.member-stats.de";
                            "" !== f && (d = "https://www.member-stats.de/?link=new_account&account=" + f);
                            if ("layout" == f) var g =
                                ClientLib.Data.MainData.GetInstance(),
                                q = g.get_Player().get_Name(),
                                d = "https://www.member-stats.de?link=layout&worldid=" + g.get_Server().get_WorldId();
                            var g = qx.core.Init.getApplication(),
                                p = (new webfrontend.gui.CustomWindow(g.tr("tnf:external link"))).set({
                                    resizable: !1,
                                    showClose: !1,
                                    showMaximize: !1,
                                    showMinimize: !1
                                });
                            p.setLayout(new qx.ui.layout.VBox(10));
                            p.addListenerOnce("resize", p.center, p);
                            p.add((new qx.ui.basic.Label(g.tr("tnf:link will lead to an external page?") + "<br />" + g.tr("tnf:do you want to continue?"))).set({
                                rich: !0,
                                maxWidth: 360,
                                wrap: !0,
                                textColor: "white"
                            }));
                            c = new qx.ui.container.Composite((new qx.ui.layout.HBox(10)).set({
                                alignX: "right"
                            }));
                            var m = new webfrontend.ui.SoundButton(g.tr("tnf:no"));
                            m.addListener("execute", function (c) {
                                p.close();
                                "layout" == f && (MeStScanner.getInstance().win.close(), !0 !== b.active && MeStScanner.Layout.window.getInstance().openWindow("MeSt Scan result"))
                            }, this);
                            g = new webfrontend.ui.SoundButton(g.tr("tnf:yes"));
                            g.addListener("execute", function (c) {
                                p.close();
                                "layout" == f && (MeStScanner.getInstance().win.close(), !0 !== b.active && MeStScanner.Layout.window.getInstance().openWindow("MeSt Scan result"));
                                c = "<form name='LaunchForm' id='LaunchForm' action='" + d + "' method='POST'>";
                                c += "<input type='hidden' name='dummy' value='dummy' />";
                                "layout" == f && (c += "<input type='hidden' name='name' value='" + q + "' />");
                                c += "</form><script type='text/javascript'>document.LaunchForm.submit();\x3c/script>";
                                var g = window.open("", "");
                                g.document.write(c);
                                g.document.close()
                            }, this);
                            c.add(m);
                            c.add(g);
                            p.add(c);
                            p.setModal(!0);
                            p.open()
                        },
                        getForumId: function (c) {
                            c =
                                ClientLib.Data.MainData.GetInstance().get_Forum().get_Forums();
                            var f = c.c,
                                b = "none",
                                d = 1,
                                g;
                            for (g in c.d) {
                                if ("MeSt PoiInfo" == c.d[g].Title) return b = c.d[g].Id;
                                if ("none" == b && d === f && d <= f) return b;
                                d++
                            }
                        },
                        SortAlliancePois: function (c, f) {
                            function b(b, c) {
                                !0 === c && 0 === g ? (d.push("Post all AlliancePois to Forum\n"), g++) : !0 === c && (0 === U ? U++ : 1 === U ? k("do something postInfoAll") : 2 < R && k("postInfoAll do is was schiaf glafn " + R));
                                !0 !== c && d.push("ERROR: Post all AlliancePois to Forum\n" + c + "\n")
                            }
                            var d = MeStmain.getInstance().getWindow();
                            d.push('Try to insert a post to "List of Alliance Poi"\n');
                            k("forumid: " + c + " threadid: " + f);
                            for (var g = 0, q = [], p = [], m = [], l = [], h = [], G = [], C = [], n = "", t = 0; t < r.length; t++) {
                                var x = r[t][1],
                                    A = r[t][7],
                                    v = r[t][2],
                                    w = r[t][0],
                                    y = r[t][3],
                                    z = r[t][6],
                                    u = r[t][4],
                                    M = r[t][5];
                                2 === r[t][7] && q.push([w, x, v, y, u, M, z, A]);
                                3 === r[t][7] && p.push([w, x, v, y, u, M, z, A]);
                                4 === r[t][7] && m.push([w, x, v, y, u, M, z, A]);
                                5 === r[t][7] && l.push([w, x, v, y, u, M, z, A]);
                                6 === r[t][7] && h.push([w, x, v, y, u, M, z, A]);
                                7 === r[t][7] && G.push([w, x, v, y, u, M, z, A]);
                                8 === r[t][7] && C.push([w,
                                    x, v, y, u, M, z, A
                                ]);
                                if (t + 1 == r.length)
                                    for (M = u = z = y = w = v = A = x = 0; M <= q.length; M++)
                                        if (0 === M && (n += "[b][u]Tiberium[/u][/b]\n"), M == q.length)
                                            for (var n = n + "\n", n = n + "\n", n = n + "[u]Tiberium TotalScore:[/u]\n", n = n + ("[b]" + x + "[/b]\n"), n = n + "[hr]\n", F = 0; F <= p.length; F++)
                                                if (0 === F && (n += "[b][u]Crystal[/u][/b]\n"), F == p.length)
                                                    for (var n = n + "\n", n = n + "\n", n = n + "[u]Crystal TotalScore:[/u]\n", n = n + ("[b]" + A + "[/b]\n"), n = n + "[hr]\n", B = 0; B <= m.length; B++)
                                                        if (0 === B && (n += "[b][u]Reactor[/u][/b]\n"), B == m.length)
                                                            for (var n = n + "\n", n = n + "\n", n = n + "[u]Power TotalScore:[/u]\n",
                                                                    n = n + ("[b]" + v + "[/b]\n"), n = n + "[hr]\n", D = 0; D <= l.length; D++)
                                                                if (0 === D && (n += "[b][u]Tungsten[/u][/b]\n"), D == l.length)
                                                                    for (var n = n + "\n", n = n + "\n", n = n + "[u]Tung TotalScore:[/u]\n", n = n + ("[b]" + w + "[/b]\n"), n = n + "[hr]\n", I = 0; I <= h.length; I++)
                                                                        if (0 === I && (n += "[b][u]Uranium[/u][/b]\n"), I == h.length)
                                                                            for (var n = n + "\n", n = n + "\n", n = n + "[u]Uran TotalScore:[/u]\n", n = n + ("[b]" + y + "[/b]\n"), n = n + "[hr]\n", K = 0; K <= G.length; K++)
                                                                                if (0 === K && (n += "[b][u]Aircraft[/u][/b]\n"), K == G.length)
                                                                                    for (var n = n + "\n", n = n + "\n", n = n + "[u]Air TotalScore:[/u]\n",
                                                                                            n = n + ("[b]" + z + "[/b]\n"), n = n + "[hr]\n", L = 0; L <= C.length; L++) 0 === L && (n += "[b][u]Resonator[/u][/b]\n"), L == C.length ? (n += "\n", n += "\n", n += "[u]Reso TotalScore:[/u]\n", n += "[b]" + u + "[/b]\n") : (n += "Level: " + C[L][2] + " Score: " + C[L][3] + " Coords: [coords]" + C[L][6] + "[/coords]\n", u += C[L][3]);
                                                                                else n += "Level: " + G[K][2] + " Score: " + G[K][3] + " Coords: [coords]" + G[K][6] + "[/coords]\n", z += G[K][3];
                                else n += "Level: " + h[I][2] + " Score: " + h[I][3] + " Coords: [coords]" + h[I][6] + "[/coords]\n", y += h[I][3];
                                else n += "Level: " + l[D][2] + " Score: " +
                                    l[D][3] + " Coords: [coords]" + l[D][6] + "[/coords]\n", w += l[D][3];
                                else n += "Level: " + m[B][2] + " Score: " + m[B][3] + " Coords: [coords]" + m[B][6] + "[/coords]\n", v += m[B][3];
                                else n += "Level: " + p[F][2] + " Score: " + p[F][3] + " Coords: [coords]" + p[F][6] + "[/coords]\n", A += p[F][3];
                                else n += "Level: " + q[M][2] + " Score: " + q[M][3] + " Coords: [coords]" + q[M][6] + "[/coords]\n", x += q[M][3]
                            }
                            if (t == r.length)
                                if (2999 >= n.length) ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("CreateForumPost", {
                                        forumID: c,
                                        threadID: f,
                                        postMessage: n
                                    },
                                    phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, b), !0), k("All Pois inserted to Forum");
                                else
                                    for (t in q = n.split("[hr]\n"), q) ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("CreateForumPost", {
                                        forumID: c,
                                        threadID: f,
                                        postMessage: q[t]
                                    }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, b), !0), k("All Pois inserted to Forum")
                        },
                        SortWhoPois: function (c, f) {
                            function b(b, c) {
                                !0 === c && 0 === d ? (g.push('Post "Who is at POI X" to Forum\n'), d++) : !0 === c && (0 === R ? R++ : 1 ===
                                    R ? (g.close(), k("do something postInfoWho")) : 1 < R && k("postInfoWho do is was schiaf glafn " + R));
                                !0 !== c && g.push('ERROR: Post "Who is at POI X" to Forum\n' + c + "\n")
                            }
                            var d = 0;
                            k('Try to insert a post to "Who is at POI X"');
                            var g = MeStmain.getInstance().getWindow();
                            g.push('Try to insert a post to "Who is at POI X"\n');
                            for (var q = [], p = [], m = [], l = [], h = [], G = [], C = [], n = "", t = 0, x = 0, A = 0, v = 0, w = 0, y = 0, z = 0, u = 0; u < r.length; u++) {
                                for (var B = r[u][0], F = r[u][1], O = r[u][2], E = r[u][3], I = r[u][4], K = r[u][5], L = r[u][6], N = r[u][7], J = 0; J < D.length; J++) {
                                    var H =
                                        D[J][5],
                                        P = D[J][6];
                                    r[u][0] == D[J][0] && (2 == N && ("undefined" === typeof q[t] && (q[t] = []), q[t].push([B, F, O, E, I, K, L, N, H, P])), 3 == N && ("undefined" === typeof p[x] && (p[x] = []), p[x].push([B, F, O, E, I, K, L, N, H, P])), 4 == N && ("undefined" === typeof m[A] && (m[A] = []), m[A].push([B, F, O, E, I, K, L, N, H, P])), 5 == N && ("undefined" === typeof l[v] && (l[v] = []), l[v].push([B, F, O, E, I, K, L, N, H, P])), 6 == N && ("undefined" === typeof h[w] ? (h[w] = [], h[w].push([B, F, O, E, I, K, L, N, H, P]), w++) : h[w].push([B, F, O, E, I, K, L, N, H, P])), 7 == N && ("undefined" === typeof G[y] && (G[y] = []), G[y].push([B, F, O, E, I, K, L, N, H, P])), 8 == N && ("undefined" === typeof C[z] && (C[z] = []), C[z].push([B, F, O, E, I, K, L, N, H, P])))
                                }
                                "undefined" !== typeof q[t] && t++;
                                "undefined" !== typeof p[x] && x++;
                                "undefined" !== typeof m[A] && A++;
                                "undefined" !== typeof l[v] && v++;
                                "undefined" !== typeof h[w] && w++;
                                "undefined" !== typeof G[y] && y++;
                                "undefined" !== typeof C[z] && z++
                            }
                            if (u == r.length) {
                                for (t = 0; t < q.length; t++)
                                    for (0 === t && (n += "[b][u]Tiberium[/u][/b]\n"), x = 0; x < q[t].length; x++) 0 === x && (n += "Level: " + q[t][x][2] + " Score: " + q[t][x][3] + " Coords [coords]" +
                                        q[t][x][6] + "[/coords]\n"), n += "Player: [player]" + q[t][x][9] + "[/player] base: " + q[t][x][8] + "\n", x + 1 == q[t].length && (n += "\n");
                                for (x = 0; x < p.length; x++)
                                    for (0 === x && (n += "[hr]\n[b][u]Crystal[/u][/b]\n"), A = 0; A < p[x].length; A++) 0 === A && (n += "Level: " + p[x][A][2] + " Score: " + p[x][A][3] + " Coords [coords]" + p[x][A][6] + "[/coords]\n"), n += "Player: [player]" + p[x][A][9] + "[/player] base: " + p[x][A][8] + "\n", A + 1 == p[x].length && (n += "\n");
                                for (A = 0; A < m.length; A++)
                                    for (0 === A && (n += "[hr]\n[b][u]Reactor[/u][/b]\n"), v = 0; v < m[A].length; v++) 0 ===
                                        v && (n += "Level: " + m[A][v][2] + " Score: " + m[A][v][3] + " Coords [coords]" + m[A][v][6] + "[/coords]\n"), n += "Player: [player]" + m[A][v][9] + "[/player] base: " + m[A][v][8] + "\n", v + 1 == m[A].length && (n += "\n");
                                for (v = 0; v < l.length; v++)
                                    for (0 === v && (n += "[hr]\n[b][u]Tungsten[/u][/b]\n"), w = 0; w < l[v].length; w++) 0 === w && (n += "Level: " + l[v][w][2] + " Score: " + l[v][w][3] + " Coords [coords]" + l[v][w][6] + "[/coords]\n"), n += "Player: [player]" + l[v][w][9] + "[/player] base: " + l[v][w][8] + "\n", w + 1 == l[v].length && (n += "\n");
                                for (w = 0; w < h.length; w++)
                                    for (0 ===
                                        w && (n += "[hr]\n[b][u]Uranium[/u][/b]\n"), y = 0; y < h[w].length; y++) 0 === y && (n += "Level: " + h[w][y][2] + " Score: " + h[w][y][3] + " Coords [coords]" + h[w][y][6] + "[/coords]\n"), n += "Player: [player]" + h[w][y][9] + "[/player] base: " + h[w][y][8] + "\n", y + 1 == h[w].length && (n += "\n");
                                for (y = 0; y < G.length; y++)
                                    for (0 === y && (n += "[hr]\n[b][u]Aircraft[/u][/b]\n"), z = 0; z < G[y].length; z++) 0 === z && (n += "Level: " + G[y][z][2] + " Score: " + G[y][z][3] + " Coords [coords]" + G[y][z][6] + "[/coords]\n"), n += "Player: [player]" + G[y][z][9] + "[/player] base: " +
                                        G[y][z][8] + "\n", z + 1 == G[y].length && (n += "\n");
                                for (z = 0; z < C.length; z++)
                                    for (0 === z && (n += "[hr]\n[b][u]Resonator[/u][/b]\n"), u = 0; u < C[z].length; u++) 0 === u && (n += "Level: " + C[z][u][2] + " Score: " + C[z][u][3] + " Coords [coords]" + C[z][u][6] + "[/coords]\n"), n += "Player: [player]" + C[z][u][9] + "[/player] base: " + C[z][u][8] + "\n", u + 1 == C[z].length && (n += "\n");
                                if (t == q.length && x == p.length && A == m.length && v == l.length && w == h.length && y == G.length && z == C.length)
                                    if (q = n.length, console.log(q), 2999 >= q) ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("CreateForumPost", {
                                        forumID: c,
                                        threadID: f,
                                        postMessage: n
                                    }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, b), !0) && k("who Pois inserted to Forum");
                                    else {
                                        var n = n.split("[hr]\n"),
                                            Q;
                                        for (Q in n) ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("CreateForumPost", {
                                            forumID: c,
                                            threadID: f,
                                            postMessage: n[Q]
                                        }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, b), !0), k("who Pois inserted to Forum")
                                    }
                                else console.log("tib " + t + " " + q.length + " cris " + x + " " + p.length + " reaktor " + A + " " + m.length +
                                    " tung " + v + " " + l.length + " uran " + w + " " + h.length + " luft " + y + " " + G.length + " reso " + z + " " + C.length)
                            }
                        },
                        PoiForum: function (c, f) {
                            function b(b, c) {
                                !0 === b && "0" == c && ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetForumThreads", {
                                    forumId: f,
                                    skip: 0,
                                    take: 10
                                }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, d), !0)
                            }

                            function d(c, d) {
                                console.log(d);
                                for (var l in d) {
                                    var m = d[l].i;
                                    "List of Alliance Poi" == d[l].t && 0 == q && (MeStmain.getInstance().SortAlliancePois(f, m), q = 1);
                                    "Who is at POI X" ==
                                    d[l].t && 0 == p && (MeStmain.getInstance().SortWhoPois(f, m), p = 1)
                                }
                                0 == q ? (g.push('Try to create Thread "List of Alliance Poi"\n'), ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("CreateForumThread", {
                                    forumID: f,
                                    threadTitle: "List of Alliance Poi",
                                    firstPostMessage: ".",
                                    subscribe: !0
                                }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, b), !0)) : 0 == p && (g.push('Try to create Thread2 "Who is at POI X"\n'), ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("CreateForumThread", {
                                    forumID: f,
                                    threadTitle: "Who is at POI X",
                                    firstPostMessage: ".",
                                    subscribe: !0
                                }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, b), !0))
                            }
                            ClientLib.Data.MainData.GetInstance().get_Forum().get_Forums();
                            var g = this.getWindow(),
                                q = 0,
                                p = 0;
                            ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetForumThreads", {
                                forumId: f,
                                skip: 0,
                                take: 10
                            }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, d), !0)
                        },
                        CreatePoiForum: function (c, f) {
                            if (!0 === ClientLib.Data.MainData.GetInstance().get_Alliance().get_CanCreateForum()) {
                                var b =
                                    function () {
                                        q.push('Try to create Thread "List of Alliance Poi"\n');
                                        var b = MeStmain.getInstance().getForumId(c),
                                            b = '{"session":"' + m + '", "forumID":' + b + ',"threadTitle":"List of Alliance Poi","subscribe":true,"firstPostMessage":"."}';
                                        l.onload = function () {
                                            "0" == l.responseText ? (l.abort(), k("Thread erstellt!!!"), q.push('Thread "List of Alliance Poi" created!\n'), window.setTimeout(d, 1E3)) : k("ERROR: thread erstellen!")
                                        };
                                        l.open("POST", "/" + p + "/Presentation/Service.svc/ajaxEndpoint/CreateForumThread");
                                        l.setRequestHeader("Content-Type",
                                            "application/json");
                                        l.send(b)
                                    },
                                    d = function () {
                                        q.push('Try to create Thread2 "Who is at POI X"\n');
                                        var b = MeStmain.getInstance().getForumId(c),
                                            b = '{"session":"' + m + '", "forumID":' + b + ',"threadTitle":"Who is at POI X","subscribe":true,"firstPostMessage":"."}';
                                        l.onload = function () {
                                            "0" == l.responseText ? (l.abort(), k("Thread2 erstellt!!!"), q.push('Thread "Who is at POI X" created!\n'), window.setTimeout(g, 1E3)) : k("ERROR: Thread2 erstellen!")
                                        };
                                        l.open("POST", "/" + p + "/Presentation/Service.svc/ajaxEndpoint/CreateForumThread");
                                        l.setRequestHeader("Content-Type", "application/json");
                                        l.send(b)
                                    },
                                    g = function () {
                                        var b = MeStmain.getInstance().getForumId(c);
                                        MeStmain.getInstance().PoiForum(c, b)
                                    };
                                k("CreatePoiForum");
                                var q = this.getWindow();
                                q.push("Try to create PoiForum\n");
                                var p = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId(),
                                    m = ClientLib.Net.CommunicationManager.GetInstance().get_InstanceId(),
                                    l = new qx.bom.request.Xhr;
                                l.onload = function () {
                                    "0" == l.responseText ? (l.abort(), k("forum erstellt!!!"), q.push("created PoiForum\n"),
                                        window.setTimeout(b, 1E3)) : k("ERROR: forum erstellt!")
                                };
                                var h = '{"session":"' + m + '", "sharedAlliance":null,"Title":"MeSt PoiInfo","Description":"List of AlliancePois"}';
                                l.open("POST", "/" + p + "/Presentation/Service.svc/ajaxEndpoint/CreateForum");
                                l.setRequestHeader("Content-Type", "application/json");
                                l.send(h)
                            } else q.push("no rights to create PoiForum\n")
                        },
                        getWindow: function () {
                            if (null === this.poiwindow) {
                                this.poiwindow = new MeStreport.window;
                                var c = qx.core.Init.getApplication().getBaseNavigationBar().getLayoutParent().getBounds().left;
                                this.poiwindow.moveTo(c - this.poiwindow.getWidth() - 200, 40)
                            }
                            return this.poiwindow
                        },
                        getPoiWindow: function () {
                            null === this.poiInfoWindow && (this.poiInfowindow = new MeStreport.window, qx.core.Init.getApplication().getBaseNavigationBar().getLayoutParent().getBounds(), this.poiInfoWindow.center());
                            return this.poiwindow
                        },
                        _Allisupport: function () {
                            for (var c = ClientLib.Data.MainData.GetInstance().get_AllianceSupportState().get_Bases().d, f, b = Object.keys(c), d = b.length, g = {}, q = 0, p = 0, m = d; d--;) f = c[b[d]], g.hasOwnProperty(f.get_Type()) ||
                                (g[f.get_Type()] = 0), g[f.get_Type()]++, 30 <= f.get_Level() && p++, q += f.get_Level();
                            q /= m;
                            c = ClientLib.Data.MainData.GetInstance().get_Alliance().get_MemberData().d;
                            g = 0;
                            b = Object.keys(c);
                            for (d = b.length; d--;) f = c[b[d]], g += f.Bases;
                            b = "Bases: " + g + " SupCount: " + m + "(" + (m / g * 100).toFixed(0) + "%) \u00d8: " + q.toFixed(2) + " 30+: " + p + "(" + (p / g * 100).toFixed(0) + "%)";
                            MeStmain.getInstance().getWindow().push(b)
                        }
                    }
                });
                qx.Class.define("MeStPlayerinfo", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        windowinterval: null,
                        windowbevoreunload: null,
                        get_info: function () {
                            try {
                                var c = ClientLib.Data.MainData.GetInstance();
                                B = c.get_Player();
                                B.get_Name();
                                B.get_AccountId();
                                T = c.get_Alliance();
                                c.get_Server().get_WorldId();
                                return !0
                            } catch (f) {
                                c = {
                                    func: "get_info",
                                    "class": "MeSt5main"
                                }, c.error = f, k(f), beta && E(f, c)
                            }
                        },
                        initialize: function () {
                            try {
                                return k("MeStPlayerinfo load"), k("MeStPlayerinfo load"), k("MeStPlayerinfo load"), k("MeStPlayerinfo load"), this.get_info() && ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfo", {
                                        id: playerId
                                    },
                                    phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.Playerinfo), null), this.windowinterval = window.setInterval(function () {
                                    MeStPlayerinfo.getInstance().interval()
                                }, 18E5), this.windowbevoreunload = window.addEventListener("beforeunload", function () {
                                    MeStPlayerinfo.getInstance().interval()
                                }), !0
                            } catch (f) {
                                var c = {
                                    func: "ini",
                                    "class": "MeStPlayerinfo"
                                };
                                c.error = f;
                                k(f);
                                beta && E(f, c)
                            }
                        },
                        interval: function () {
                            try {
                                if (Main.get_info()) return ClientLib.Net.CommunicationManager.GetInstance().SendSimpleCommand("GetPublicPlayerInfo", {
                                    id: playerId
                                }, phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.Playerinfo), null), !0
                            } catch (f) {
                                var c = {
                                    func: "interval",
                                    "class": "MeStPlayerinfo"
                                };
                                c.error = f;
                                k(f);
                                beta && E(f, c)
                            }
                        },
                        Playerinfo: function (c, f) {
                            try {
                                var b = {
                                    server: {}
                                };
                                b.server.serverid = worldId;
                                b.server.serverName = MainData.get_Server().get_Name().trim();
                                if (0 < f.a) {
                                    b.alli = {};
                                    b.alli.alliId = f.a;
                                    b.alli.alliName = f.an;
                                    b.alli.cic = T.get_FirstLeaders().l;
                                    b.alli.sc = T.get_SecondLeaders().l;
                                    b.alli.roleinfo = T.get_Roles().d;
                                    var d = MainData.get_Alliance().get_MemberData();
                                    b.alli.member = d
                                }
                                b.player = {};
                                b.player.name = playerName;
                                b.player.id = playerId;
                                b.player.accountid = accountId;
                                b.player.creationDate = B.get_CreationDate();
                                b.player.fraction = B.get_Faction();
                                b.player.bases = {};
                                b.player.pve = f.bd;
                                b.player.pvp = f.bd - f.bde;
                                b.player.points = f.p;
                                b.player.rank = f.r;
                                b.player.hascode = f.hchc;
                                b.player.maxcp = B.GetCommandPointMaxStorage();
                                b.player.actcp = Math.round(B.GetCommandPointCount());
                                b.player.funds = MainData.get_Inventory().get_PlayerFunds();
                                b.player.schirme = Math.round(B.GetSupplyPointCount());
                                b.player.RPoints = B.get_ResearchPoints();
                                b.player.CreditsCount = Math.round(B.GetCreditsCount());
                                var g = MainData.get_Player(),
                                    q = g.get_Faction(),
                                    p = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, q),
                                    m = g.get_PlayerResearch().GetResearchItemFomMdbId(p).get_NextLevelInfo_Obj(),
                                    d = [],
                                    l;
                                for (l in m.rr) 0 < m.rr[l].t && (d[m.rr[l].t] = m.rr[l].c);
                                var C = d[ClientLib.Base.EResourceType.Gold],
                                    G = d[ClientLib.Base.EResourceType.ResearchPoints],
                                    r = g.get_Credits(),
                                    n = (r.Delta + r.ExtraBonusDelta) *
                                    ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour(),
                                    t = (C - B.GetCreditsCount()) / n;
                                b.player.timeTOmcv = Math.round(3600 * t);
                                b.player.rpNeeded = G;
                                var x = MainData.get_Cities(),
                                    A = f.c.length;
                                b.player.basecount = A;
                                for (l = 0; l < A; l++) {
                                    var v = x.GetCity(f.c[l].i),
                                        w, y, z, g = {};
                                    g.Id = f.c[l].i;
                                    g.Na = v.get_Name();
                                    g.Po = f.c[l].p;
                                    g.Lvl = parseFloat(v.get_LvlBase().toFixed(2));
                                    g.Off = parseFloat(v.get_LvlOffense().toFixed(2));
                                    g.Def = parseFloat(v.get_LvlDefense().toFixed(2));
                                    g.PosX = f.c[l].x;
                                    g.PosY = f.c[l].y;
                                    z = v.get_CityUnitsData();
                                    g.repInf = 0 < g.Off ? z.GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, !1) : 0;
                                    g.repVeh = 0 < g.Off ? z.GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, !1) : 0;
                                    g.repAir = 0 < g.Off ? z.GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, !1) : 0;
                                    g.maxRep = 0 < g.Off ? v.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf) : 0;
                                    g.availRep = 0 < g.Off ? ClientLib.Base.Resource.GetResourceCount(v.get_RepairOffenseResources().get_RepairChargeOffense()) : 0;
                                    y = v.get_SupportWeapon();
                                    g.supWp =
                                        null !== y ? y.n : "";
                                    y = v.get_SupportData();
                                    g.supWplvl = null !== y ? y.get_Level() : 0;
                                    w = v.get_CityBuildingsData();
                                    y = w.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Construction_Yard);
                                    g.CY = null !== y ? y.get_CurrentLevel() : 0;
                                    y = w.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_Facility);
                                    g.DF = null !== y ? y.get_CurrentLevel() : 0;
                                    y = w.GetUniqueBuildingByTechName(ClientLib.Base.ETechName.Defense_HQ);
                                    g.DHQ = null !== y ? y.get_CurrentLevel() : 0;
                                    g.PP = Math.round(v.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, !1, !1));
                                    g.PBP = Math.round(v.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power));
                                    g.PAB = ClientLib.Data.MainData.GetInstance().get_Alliance().GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                    g.CP = Math.round(ClientLib.Base.Resource.GetResourceGrowPerHour(v.get_CityCreditsProduction(), !1));
                                    g.CBP = Math.round(ClientLib.Base.Resource.GetResourceBonusGrowPerHour(v.get_CityCreditsProduction(), !1));
                                    g.Tall = Math.round(v.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, !1, !1) + v.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium) + ClientLib.Data.MainData.GetInstance().get_Alliance().GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium));
                                    g.Call = Math.round(v.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, !1, !1) + v.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal) + ClientLib.Data.MainData.GetInstance().get_Alliance().GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal));
                                    g.PPall = g.PP + g.PBP + g.PAB;
                                    g.CPall =
                                        g.CP + g.CBP;
                                    b.player.bases[l] = g;
                                    b.player.bases[l].cncopt = V(g.Id, l)
                                }
                                b.player.mainoff = 0;
                                b.player.maindef = 0;
                                b.player.mainavailrep = 0;
                                b.player.mainrepinf = 0;
                                b.player.mainrepveh = 0;
                                b.player.mainrepair = 0;
                                b.player.supschnitt = 0;
                                b.player.defschnitt = 0;
                                b.player.tibgesamt = 0;
                                b.player.crigesamt = 0;
                                b.player.cashgesamt = 0;
                                b.player.powergesamt = 0;
                                b.player.mainpower = 0;
                                for (var u in b.player.bases) delete b.player.bases[u].PP, delete b.player.bases[u].PBP, delete b.player.bases[u].PAB, delete b.player.bases[u].CP, delete b.player.bases[u].CBP,
                                    b.player.bases[u].Off > b.player.mainoff && (b.player.mainoff = b.player.bases[u].Off, b.player.mainpower = b.player.bases[u].PPall, b.player.maindef = b.player.bases[u].Def, b.player.mainavailrep = b.player.bases[u].availRep, b.player.mainrepinf = b.player.bases[u].repInf, b.player.mainrepveh = b.player.bases[u].repVeh, b.player.mainrepair = b.player.bases[u].repAir), b.player.supschnitt += b.player.bases[u].supWplvl, b.player.defschnitt += b.player.bases[u].Def, b.player.tibgesamt += b.player.bases[u].Tall, b.player.crigesamt +=
                                    b.player.bases[u].Call, b.player.cashgesamt += b.player.bases[u].CPall, b.player.powergesamt += b.player.bases[u].PPall;
                                b.player.supschnitt /= b.player.basecount;
                                b.player.defschnitt /= b.player.basecount;
                                b.player.supschnitt = b.player.supschnitt.toFixed(2);
                                b.player.defschnitt = b.player.defschnitt.toFixed(2);
                                var D = b.player.bases;
                                delete b.player.bases;
                                b.player.bases = D;
                                null !== h.xhr._xhr ? (xhr = h.xhr, xhr.send("https://www.member-stats.de/playerinfo.php?i=playerinfos", "POST", null, b, this.callback)) : (b = {
                                    func: "playerinfo",
                                    "class": "MeStPlayerinfo",
                                    error: "MeSt.xhr.req !== null"
                                }, k("MeSt.xhr.req !== null"), beta && E("MeSt.xhr.req !== null", b))
                            } catch (F) {
                                b = {
                                    func: "playerinfo",
                                    "class": "MeStPlayerinfo"
                                }, b.error = F, k(F), beta && E(F, b)
                            }
                        },
                        callback: function (c) {
                            try {
                                !1 !== JSON.isjson(c) && ("parse" === JSON.isjson(c) ? JSON.parse(c) : "stringify" === JSON.isjson(c) && JSON.stringify(c))
                            } catch (f) {
                                c = {
                                    func: "callback",
                                    "class": "MeStPlayerinfo"
                                }, c.error = f, k(f), beta && E(f, c)
                            }
                        }
                    }
                });
                qx.Class.define("MeStreport.window", {
                    extend: qx.ui.window.Window,
                    construct: function () {
                        qx.ui.window.Window.call(this);
                        this.set({
                            caption: "MeSt Info",
                            icon: "webfrontend/ui/icons/icn_show_combat_active.png",
                            layout: new qx.ui.layout.VBox(4),
                            width: 300,
                            height: 50,
                            contentPaddingTop: 0,
                            contentPaddingBottom: 6,
                            contentPaddingRight: 6,
                            contentPaddingLeft: 6,
                            showMaximize: !1,
                            showMinimize: !1,
                            allowMaximize: !1,
                            allowMinimize: !1,
                            resizable: !0,
                            visibility: "excluded",
                            textColor: "#bfbfbf"
                        });
                        this.getChildControl("icon").set({
                            scale: !0,
                            width: 18,
                            height: 17,
                            alignY: "middle",
                            marginLeft: 8
                        });
                        this.add(this.logContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox));
                        this.add(new qx.ui.core.Spacer, {
                            flex: 1
                        });
                        this.addListener("close", function () {
                            this.onClose()
                        })
                    },
                    members: {
                        logContainer: null,
                        onClose: function () {
                            this.removeAll();
                            this.add(this.logContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox))
                        },
                        push: function (c, f) {
                            this.isActive() || this.open();
                            this.logContainer.add(new qx.ui.basic.Label(c.toString()));
                            f && this.logContainer.add(f)
                        },
                        delall: function () {
                            this.removeAll();
                            this.add(this.logContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox))
                        },
                        initialize: function () {
                            try {
                                k("MeStreport.window loadet")
                            } catch (c) {
                                k(c)
                            }
                        }
                    }
                });
                var C = {
                        _g: function (c, f, b, d) {
                            c = c.toString().replace(/\s/gim, "");
                            f = c.match(f);
                            var g;
                            for (g = 1; g < d + 1; g++) null !== f && 6 === f[g].length ? console.debug(b, g, f[g]) : null !== f && 0 < f[g].length ? console.warn(b, g, f[g]) : (console.error("Error - ", b, g, "not found"), console.warn(b, c));
                            return f
                        },
                        patch: function () {
                            if (!d._patched) {
                                var c = ClientLib.Data.WorldSector.WorldObjectCity.prototype,
                                    c = ClientLib.Data.WorldSector.WorldObjectNPCBase.prototype;
                                re = /100\){0,1};this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/;
                                var f = C._g(c.$ctor,
                                    re, "ClientLib.Data.WorldSector.WorldObjectNPCBase", 2);
                                null !== f && 6 === f[1].length ? c.getLevel = function () {
                                    return this[f[1]]
                                } : console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.Level undefined");
                                null !== f && 6 === f[2].length ? c.getID = function () {
                                    return this[f[2]]
                                } : console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.ID undefined");
                                c = ClientLib.Data.WorldSector.WorldObjectNPCCamp.prototype;
                                re = /100\){0,1};this\.(.{6})=Math.floor.*this\.(.{6})=\(*g\>\>(22|0x16)\)*\&.*=-1;\}this\.(.{6})=\(/;
                                var b = C._g(c.$ctor, re, "ClientLib.Data.WorldSector.WorldObjectNPCCamp", 4);
                                null !== b && 6 === b[1].length ? c.getLevel = function () {
                                    return this[b[1]]
                                } : console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.Level undefined");
                                null !== b && 6 === b[2].length ? c.getCampType = function () {
                                    return this[b[2]]
                                } : console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.CampType undefined");
                                null !== b && 6 === b[4].length ? c.getID = function () {
                                    return this[b[4]]
                                } : console.error("Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.ID undefined");
                                d._patched = !0
                            }
                        }
                    },
                    d = null;
                qx.Class.define("MeStScanner", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        initialize: function () {
                            try {
                                k("Scanner loadet\n"), MeStmain.getInstance().AddMainMenu("scan layouts", function () {
                                    MeStScanner.getInstance().scan()
                                }, "ALT+s"), d = MeStScanner.getInstance(), d.win = MeStmain.getInstance().getWindow(), d.storage = MeStstorage.getInstance(), d.xhr = h.xhr, d.winOpen = MeStmain.getInstance(), d.startup()
                            } catch (c) {
                                k(c)
                            }
                        },
                        _patched: !1,
                        _bases: {},
                        _selectionBases: {},
                        _scanned: [],
                        _toScan: [],
                        _scanning: !1,
                        failCount: 0,
                        wincounter: 0,
                        basecounter: 0,
                        button: function () {
                            if (!0 === d._abort) {
                                var c = new qx.ui.form.Button("resume");
                                c.addListener("execute", function () {
                                    d.resume()
                                }, this)
                            } else c = new qx.ui.form.Button("stop"), c.addListener("execute", function (c) {
                                d.abort();
                                var b = ClientLib.Data.MainData.GetInstance();
                                c = b.get_Player().get_Name();
                                var f = b.get_Server().get_WorldId(),
                                    b = b.get_Alliance().get_Id();
                                d.xhr.send("https://www.member-stats.de/task/xhr/layout.php?pl=" + c + "&w=" + f + "&a=" + b, "POST", null, d._bases, k)
                            }, this);
                            return c
                        },
                        scan: function (c) {
                            k("start scan");
                            if (d._scanning) k("BaseScanner._scanning");
                            else if (null == c && (d.win.isActive() && (d.win.delall(), d.win.close()), d.win.open()), !0 === d._abort) d.resume();
                            else {
                                d.win.push("start Scanning");
                                d._bases = {};
                                d._scanning = !0;
                                d._count = 0;
                                d._done = 0;
                                d.index = -1;
                                d._toScanMap = {};
                                d._toScan = [];
                                d.basecounter = 0;
                                c = d.storage.get("scan");
                                Array.isArray(c) || (d.storage.set("scan", "[]"), c = d.storage.get("scan"));
                                for (var f = d.storage.get("scan").length; 800 <= f;) c.shift(), f--, 800 >= f && d.storage.set("scan",
                                    c);
                                c = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                                for (var b in c) c.hasOwnProperty(b) && (f = c[b], void 0 === f && k("unable to find base: " + b), d.getNearByBases(f));
                                d.scanNextBase()
                            }
                        },
                        getNearByBases: function (c) {
                            for (var f = c.get_PosX(), b = c.get_PosY(), h = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance() - .5, g = ClientLib.Data.MainData.GetInstance().get_World(), q = 0, p = b - 11; p <= b + 11; p++)
                                for (var m = f - 11; m <= f + 11; m++) {
                                    var l = Math.abs(f - m),
                                        k = Math.abs(b - p),
                                        l = Math.sqrt(l * l + k *
                                            k);
                                    if (!(l >= h || void 0 !== d._toScanMap[m + ":" + p] || void 0 !== d._bases[m + ":" + p] || (k = g.GetObjectFromPosition(m, p), null === k || k.Type !== ClientLib.Data.WorldSector.ObjectType.NPCBase && k.Type !== ClientLib.Data.WorldSector.ObjectType.NPCCamp || "function" === typeof k.getCampType && k.getCampType() === ClientLib.Data.Reports.ENPCCampType.Destroyed))) {
                                        var C = 0;
                                        if (null !== d.storage.get("scan")) {
                                            var r = d.storage.get("scan");
                                            if (!0 === Array.isArray(r))
                                                for (var n = d.storage.get("scan").length, t = 0; t < n; t++) k.getID() === r[t] && (C = 1);
                                            else d.storage.set("scan",
                                                "[]")
                                        } else d.storage.set("scan", "[]");
                                        0 < C || (r = d.storage.get("scan"), r.push(k.getID()), MeStstorage.getInstance().set("scan", r), n = ClientLib.Data.MainData.GetInstance(), C = n.get_Player().get_Name(), r = n.get_Server().get_WorldId(), n = n.get_Alliance().get_Id(), l = {
                                            x: m,
                                            y: p,
                                            level: k.getLevel(),
                                            id: k.getID(),
                                            distance: l,
                                            selectedBaseID: c.get_Id(),
                                            alliance: n,
                                            world: r,
                                            player: C,
                                            failCount: 0
                                        }, d._toScan.push(l), d._toScanMap[m + ":" + p] = l, q++)
                                    }
                                }
                        },
                        abort: function () {
                            d._scanning = !1;
                            d._abort = !0;
                            d.win.delall();
                            d.win.push("stop scan");
                            d.win.push(("   " + d.index).slice(-3) + "/" + d._toScan.length);
                            d.win.push("", d.button())
                        },
                        resume: function () {
                            d._scanning = !0;
                            d._abort = !1;
                            d.win.delall();
                            d.win.push("resume scan");
                            d.win.push(("   " + d.index).slice(-3) + "/" + d._toScan.length);
                            d.win.push("", d.button());
                            d.scanNextBase()
                        },
                        done: function () {
                            d._done++;
                            var c = ClientLib.Data.MainData.GetInstance(),
                                f = c.get_Player().get_Name(),
                                b = c.get_Server().get_WorldId(),
                                c = c.get_Alliance().get_Id();
                            if (!1 === d._scanning && d._count === d._done && !1 === d._abort)
                                if (d.win.push(""),
                                    0 < d._count) {
                                    if (d.win.push("Done! (" + d._count + ")"), d.win.push(""), d.xhr.send("https://www.member-stats.de/task/xhr/layout.php?pl=" + f + "&w=" + b + "&a=" + c, "POST", null, d._bases, k), d.winOpen.winOpen("layout", "layout"), 5 > Object.keys(d._bases).length) {
                                        var h = MeStScanner.Layout.window.getInstance();
                                        !0 !== h.active && (h.active = !0, h.openWindow("MeSt Scan result", null, 1));
                                        h.FO(d._bases);
                                        d.xhr.send("https://www.member-stats.de/task/xhr/layout.php?pl=" + f + "&w=" + b + "&a=" + c, "POST", null, d._bases, k);
                                        d._bases = {}
                                    }
                                } else d.win.push("Done! 0 new layouts to scan"),
                                    d.win.push("");
                            else !1 === d._scanning && d._count + 1 === d._done && !1 === d._abort ? (d.win.delall(), d.win.push(""), 0 < d._count ? (d.win.push("Done! (" + d._count + ")"), d.win.push(""), d.xhr.send("https://www.member-stats.de/task/xhr/layout.php?pl=" + f + "&w=" + b + "&a=" + c, "POST", null, d._bases, k), d.winOpen.winOpen("layout", "layout"), 5 > Object.keys(d._bases).length && (h = MeStScanner.Layout.window.getInstance(), !0 !== h.active && (h.active = !0, h.openWindow("MeSt Scan result", null, 1)), h.FO(d._bases), d.xhr.send("https://www.member-stats.de/task/xhr/layout.php?pl=" +
                                f + "&w=" + b + "&a=" + c, "POST", null, d._bases, k), d._bases = {})) : (d.win.push("Done! 0 new layouts to scan"), d.win.push(""))) : !1 === d._scanning && !1 === d._abort && d.win.push("Scan")
                        },
                        getBaseLayout: function (c) {
                            var f = ClientLib.Data.MainData.GetInstance(),
                                b = f.get_Player().get_Name(),
                                h = f.get_Server().get_WorldId(),
                                f = f.get_Alliance().get_Id();
                            if (!d._abort)
                                if (void 0 === c) d._abort = !1, d._scanning = !1, !1 === d._abort && d.done(), k("[BaseScanner] base undefined");
                                else {
                                    d._lastBaseID !== c.selectedBaseID && d.setCurrentBase(c.selectedBaseID);
                                    ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(c.id);
                                    var g = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(c.id);
                                    ClientLib.Net.CommunicationManager.GetInstance().UserAction();
                                    if (g.get_IsGhostMode()) return d.scanNextBase();
                                    if (0 === g.GetBuildingsConditionInPercent()) return c.failCount++, 30 === c.failCount ? (k("[BaseScanner] max_fails"), d.scanNextBase()) : setTimeout(function () {
                                        d.getBaseLayout(c)
                                    }, 99);
                                    var q = g.get_Name();
                                    c.layout = d.getLayout(g);
                                    c.name = q;
                                    d._bases[c.x + ":" + c.y] =
                                        c;
                                    d.basecounter++;
                                    g = MeStScanner.Layout.window.getInstance();
                                    !0 !== g.active && (g.active = !0, g.openWindow("MeSt Scan result", null, 1));
                                    4 < d.basecounter && (d.basecounter = 0, g.FO(d._bases), d.xhr.send("https://www.member-stats.de/task/xhr/layout.php?pl=" + b + "&w=" + h + "&a=" + f, "POST", null, d._bases, k), d._bases = {});
                                    ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
                                    ClientLib.Data.MainData.GetInstance().get_Player().get_Name();
                                    d._count++;
                                    d.printScanResults(c);
                                    d.done();
                                    d.scanNextBase()
                                }
                        },
                        scanNextBase: function () {
                            !0 !==
                                d._abort && (void 0 === d.index ? d.index = 0 : d.index++, d.getBaseLayout(d._toScan[d.index]))
                        },
                        isScanning: function () {
                            return !0 === d._scanning
                        },
                        printScanResults: function (c) {
                            d.win.delall();
                            if (!1 === d._abort) switch (d.wincounter) {
                            case 0:
                                d.wincounter++;
                                d.win.push("Scanning");
                                break;
                            case 1:
                                d.wincounter++;
                                d.win.push("Scanning.");
                                break;
                            case 2:
                                d.wincounter++;
                                d.win.push("Scanning..");
                                break;
                            case 3:
                                d.wincounter = 0;
                                d.win.push("Scanning...");
                                break;
                            default:
                                d.win.push("Scanning")
                            } else d.win.push("Scanning");
                            d.win.push(("   " +
                                d.index).slice(-3) + "/" + d._toScan.length);
                            d.win.push("", d.button())
                        },
                        getLayout: function (c) {
                            for (var f = [], b = 0; 16 > b; b++)
                                for (var d = 0; 9 > d; d++) switch (c.GetResourceType(d, b)) {
                                case 0:
                                    f.push(".");
                                    break;
                                case 1:
                                    f.push("c");
                                    break;
                                case 2:
                                    f.push("t");
                                    break;
                                case 4:
                                    f.push("j");
                                    break;
                                case 5:
                                    f.push("h");
                                    break;
                                case 6:
                                    f.push("l");
                                    break;
                                case 7:
                                    f.push("k")
                                }
                            return f.join("")
                        },
                        setCurrentBase: function (c) {
                            var f = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[c];
                            ClientLib.Vis.VisMain.GetInstance().CenterGridPosition(f.get_PosX(),
                                f.get_PosY());
                            ClientLib.Vis.VisMain.GetInstance().Update();
                            ClientLib.Vis.VisMain.GetInstance().ViewUpdate();
                            d._lastBaseID = c
                        },
                        startup: function () {
                            C.patch();
                            phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.SelectionChange, d, d.onSelectionChange)
                        },
                        destroy: function () {
                            phe.cnc.Util.detachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.SelectionChange, d, d.onSelectionChange)
                        },
                        onSelectionChange: function () {
                            try {
                                if (!d.isScanning() && !0 !==
                                    d._abort) {
                                    d.failCount = 0;
                                    d._bases = {};
                                    d._count = 0;
                                    d._done = 0;
                                    d.index = -1;
                                    d._toScanMap = {};
                                    d._toScan = [];
                                    void 0 !== d.selectionChange && (clearTimeout(d.selectionChange), d.selectionChange = void 0);
                                    var c = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(),
                                        c = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                                    if (null !== c && !0 === ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().IsNPC()) {
                                        for (id in d._scanned)
                                            if (d._scanned[id] == c.get_Id()) {
                                                console.log("already scanned");
                                                return
                                            }
                                        d._scanned.push(c.get_Id());
                                        d.scanCurrentBase()
                                    }
                                }
                            } catch (f) {
                                console.log(f)
                            }
                        },
                        scanCurrentBase: function () {
                            var c = ClientLib.Data.MainData.GetInstance().get_Cities(),
                                f = c.get_CurrentCity(),
                                b = c.get_CurrentOwnCity();
                            d.failCount++;
                            if (!(30 < d.failCount)) {
                                if (null === f) return k("base = 0"), d.selectionChange = setTimeout(d.scanCurrentBase, 100), d.selectionChange;
                                void 0 !== d.selectionChange && (clearTimeout(d.selectionChange), d.selectionChange = void 0);
                                var c = f.get_PosX(),
                                    h = f.get_PosY();
                                f.get_Id();
                                if (f.get_IsGhostMode()) d.failCount = 0;
                                else if (0 === f.GetBuildingsConditionInPercent()) d.selectionChange =
                                    setTimeout(d.scanCurrentBase, 100);
                                else {
                                    d.failCount = 0;
                                    var g = ClientLib.Data.MainData.GetInstance(),
                                        q = g.get_Player().get_Name(),
                                        p = g.get_Server().get_WorldId(),
                                        g = g.get_Alliance().get_Id(),
                                        m = ClientLib.Base.Util.CalculateDistance(f.get_PosX(), f.get_PosY(), b.get_PosX(), b.get_PosY()),
                                        b = {
                                            x: f.get_PosX(),
                                            y: f.get_PosY(),
                                            level: f.get_BaseLevel(),
                                            id: f.get_Id(),
                                            distance: m,
                                            selectedBaseID: b.get_Id(),
                                            alliance: g,
                                            world: p,
                                            player: q,
                                            failCount: 0
                                        },
                                        m = f.get_Name();
                                    b.layout = d.getLayout(f);
                                    b.name = m;
                                    b.alliance = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Id();
                                    d._bases[c + ":" + h] = b;
                                    d._selectionBases[c + ":" + h] = b;
                                    ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
                                    ClientLib.Data.MainData.GetInstance().get_Player().get_Name();
                                    ClientLib.Data.MainData.GetInstance().get_Alliance().get_Id();
                                    d.xhr.send("https://www.member-stats.de/task/xhr/layout.php?pl=" + q + "&w=" + p + "&a=" + g, "POST", null, d._bases, k)
                                }
                            }
                        }
                    }
                });
                qx.Class.define("MeStstorage", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        get: function (c) {
                            c = localStorage.getItem("MeSt:" + c);
                            return null === c ? c : JSON.parse(c)
                        },
                        set: function (c, f) {
                            if (null === f || void 0 === f) return h.storage.remove(c);
                            "string" !== typeof f && (f = JSON.stringify(f));
                            return localStorage.setItem("MeSt:" + c, f)
                        },
                        remove: function (c) {
                            return localStorage.removeItem("MeSt:" + c)
                        },
                        initialize: function () {
                            try {
                                k("MeStstorage loadet")
                            } catch (c) {
                                k(c)
                            }
                        }
                    }
                });
                qx.Class.define("MeStxhr", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        send: function (c, f) {
                            var b = (new qx.bom.request.Xhr)._createNativeXhr();
                            b.timeout = 3E3;
                            b.onload = function () {
                                1 == b.responseText ? k("MeStxhr Send true!") :
                                    0 == b.responseText ? k("MeStxhr is Error :: " + b.responseText) : 1 !== b.responseText;
                                b.abort()
                            };
                            b.ontimeout = function () {
                                k("xhr timeout");
                                b.abort()
                            };
                            b.onloadend = function () {
                                k("xhr timeout");
                                b.abort()
                            };
                            b.open("POST", c, !0);
                            b.setRequestHeader("Method", "POST");
                            b.setRequestHeader("Content-Type", "application/json");
                            b.send(JSON.stringify(f))
                        },
                        initialize: function () {
                            try {
                                k("MeStxhr loadet")
                            } catch (c) {
                                k(c)
                            }
                        }
                    }
                });
                h.xhr = {
                    _load: !1,
                    _xhr: null,
                    _timeout: 3E3,
                    start: function () {
                        var c = null;
                        if (window.XMLHttpRequest) c = new XMLHttpRequest;
                        else if (window.ActiveXObject) try {
                            c = new ActiveXObject("Msxml2.XMLHTTP.6.0")
                        } catch (f) {
                            try {
                                c = new ActiveXObject("Msxml2.XMLHTTP.3.0")
                            } catch (b) {
                                k(b)
                            }
                        }
                        if (null === c) return !1;
                        h.xhr._load = !0;
                        h.xhr._xhr = c;
                        h.xhr._xhr.timeout = h.xhr._timeout;
                        return h.xhr._load
                    },
                    send: function (c, f, b, d, g) {
                        try {
                            if (null !== h.xhr._xhr)
                                if (!1 !== h.xhr._load && null !== h.xhr._xhr) {
                                    h.xhr._xhr.open(f, c, !0);
                                    if (null !== b && "object" == typeof b)
                                        for (var q in b) b[q].hasOwnProperty("name") && b[q].hasOwnProperty("value") && h.xhr._xhr.setRequestHeader(b[q].name,
                                            b[q].value);
                                    h.xhr._xhr.onload = function () {
                                        try {
                                            4 == h.xhr._xhr.readyState && 200 == h.xhr._xhr.status && "function" == typeof g && g(h.xhr._xhr.responseText)
                                        } catch (p) {
                                            k(p)
                                        }
                                    };
                                    null !== d ? "stringify" == JSON.isjson(d) && !0 === Array.isarray(d) || !0 === Object.isobj(d) && "stringify" == JSON.isjson(d) ? h.xhr._xhr.send(JSON.stringify(d)) : k(e) : h.xhr._xhr.send(null)
                                } else alert("Ihr Browser unterstuetzt kein Ajax!")
                        } catch (p) {
                            k(p)
                        }
                    }
                };
                qx.Class.define("MeStScanner.Layout.window", {
                    type: "singleton",
                    extend: qx.ui.window.Window,
                    construct: function () {
                        try {
                            this.base(arguments),
                                this.setWidth(925), this.setHeight(700), this.setContentPadding(10), this.setShowMinimize(!1), this.setShowMaximize(!0), this.setShowClose(!0), this.setResizable(!0), this.setAllowMaximize(!0), this.setAllowMinimize(!1), this.setAllowClose(!0), this.setShowStatusbar(!1), this.setDecorator(null), this.setPadding(10), this.setLayout(new qx.ui.layout.Grow), this.addListener("close", function () {
                                    this.active = !1;
                                    this.row = 0;
                                    this.ZW = [];
                                    this.removeAll();
                                    this.ZZ = new qx.ui.container.Scroll;
                                    this.ZY = new qx.ui.container.Composite(new qx.ui.layout.Flow);
                                    this.add(this.ZZ, {
                                        flex: 3
                                    });
                                    this.ZZ.add(this.ZY)
                                }, this), this.ZW = [], this.removeAll(), this.ZZ = new qx.ui.container.Scroll, this.ZY = new qx.ui.container.Composite(new qx.ui.layout.Flow), this.add(this.ZZ, {
                                    flex: 3
                                }), this.ZZ.add(this.ZY)
                        } catch (c) {
                            console.debug("MeStScanner.Layout.window construct: ", c)
                        }
                    },
                    members: {
                        ZW: null,
                        ZZ: null,
                        ZY: null,
                        ZX: null,
                        row: 0,
                        openWindow: function (c, f, b) {
                            try {
                                "" !== c && this.setCaption(c), this.isVisible() && null === f ? this.close() : null !== b ? (this.open(), this.moveTo(30, 100)) : (this.open(), this.moveTo(30,
                                    100), null !== f ? this.FO(f) : this.FO())
                            } catch (S) {
                                console.log("MeStScanner.Layout.window.openWindow: ", S)
                            }
                        },
                        listener: function (c) {
                            var f = qx.core.Init.getApplication();
                            f.getBackgroundArea().closeCityInfo();
                            f.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, c, 0, 0);
                            f = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                            null != f && f.get_CityArmyFormationsManager().set_CurrentTargetBaseId(c)
                        },
                        FO: function (c) {
                            try {
                                if (!0 !== this.active) return setTimeout(function () {
                                    this.openWindow("",
                                        c)
                                }, 90);
                                var f = {
                                        ".": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURQAAAKd6PdoAAAABdFJOUwBA5thmAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",
                                        c: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAGMUExURQAAAJvj+p3l+57m+5vj+prj+p7m+5nh+pni+pri+pni+pri+pvj+5ri+pzl+57n+57m+5ff+Z7m+5nh+qDv/Zvj+57m+6Hr/KL6/pni+p30/Zrl+53z/aLt/KL9/pf0/Zn3/Zv4/pfr+6L0/Zf3/Z7n+5fs+6L1/Zf6/qL8/qL2/pfm+qLw/AlQf5n8/BJVbwlTq3HQ05P29wRFaGzY3hZnhAtRn4zu7h2JtBVxnQMtShFidgZMdQdIk5/9/gY7eQI5YAY9lgY6QghmnAZIUQtUlUe26RmQzwhHXAqAvBFzwg9WjRXM4AtpkTGZowtbZwQscWSt3SuF2SiKk3/j5pLb8WD29UiZpFzR1VzP4htnmjS0xiVpdR2VswpIiSCb6Tap6Ac1g33s7kCq0CeDswQxYjSx2cf2/GrQ6x5mrGfH8izk9UzCyzWEmyuouw+XpAuPyi6ApDqLkF7GzWS9wxbD8TKJzEmPwB+x7ShDQRS90zKGmXHl9wdYtX3M6KHo+k6stWzoymS0yB9GXksjNTkAAAAzdFJOUwAHHxQLFxsBBQMkDQkoMUZCTyw3fBA9VOVYqWWhS/W53sh3sM9ok43r2b52cP///////t3sG3QAAAIISURBVCjPrZJVc9tAFEazwpVkkRljOw23smzZlpkZYjvMzFBmTOGPd5VkAtO+dKb3UWe+785dnaGhfxgazd8Jw0ATQQDIPOQ0AwEAhI2kMIy0EfBBBKLvCJgtksdq4UmCuZeDNooVJbvoGPMvRPyimQR3xQxBCVYt5LY+ckbWkwm3yHJ3UYibfVNHmyHnwupSvfE0MWIhb7fSJkzyxpZ29rW1xcW5udRyUEbRm2KG4x1TK1p9O7ZWa8/OJjcSjy0kuKEMLow568c7794fhPVOPK4mxmXeBq7XQkrKx051vVR4Ga4pivJZC3jtmA1et7KO/MZhKVwqbClKLhv9Hll+My6QwGAAFzzTkfRgd1dVy9Fcpv3tx+r+qISZjFIOEyece83BYGbzeTodz54eX54dTMosgSAKPgldrMd/9T91u61oOqe3z05mQjLPGUdS9umLlLqlds/P31aKh/rX2s8jBI0kTWBivpct6J3Glw/blWIh11H6/VdBu7GTIbCJlUyxFC5+TDVeVNRqtdXqRUZHzDg6hTFRPi2WiSrJeLmZypab0eTJpNclUMbb0wDnHW6tF8sP7z3LVOfnX4f8HhExSF+dQpkla9BrRT9seDgQcHtkC0sSVwxZwJFIAbsk+hwul0uWBJbkIHPrD+BsOEliGMvzPEvhHLhvGI38YiAESD3C9Id8/31+A0POUa1xABFzAAAAAElFTkSuQmCC",
                                        t: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAGbUExURQAAAJri+pvj+prj+pnh+pjg+prj+pjh+pri+pzk+5rj+pni+pzl+5ri+pjh+pnh+prj+pnh+pni+pni+pjw/Jzl+5/s/Jrn+5ff+Zzl+5fz/Z/p/Jzw/Zf0/Jrm+5r3/aL4/Zfh+p7t/Jvt/Jv1/Zfv/Jvw/Jf6/aL6/gtsLQ6IVBKiXghkNm/Sw5H49ARQHJj7+g+FNwhdLYzx7ByrThCNQXvo1w1/OAt2NSvNZhKgRxCdURFyPAdlJRe/ZA2TToPt4y+yZxBsNh2YXA6RW2jcvxW3TTXykCqAWkachqD+/oLk3UeogUCeeWDEplSxnCJwVBKlWBqPNwMyFA2SKAqAUhyGPn71qDSTYhxfPC/liFHFdiTjbqr4sFnFiyCWSRCaQzrCfg1/Rz3ubGj0sVbTp7v7yBC8LBvmNBNKOSrtbxLKKV7xgkvenV3AoHzZzk6/mFHXTAtXLGndrVq5Wcr8zUvvjF+9e2HkmnTmr0fWem7m0C2nfxnVSFKPbRvUakbehimOUz3ORRbDbmveyTnfjnH1hFnMph+1ZunFEtoAAAApdFJOUwAUEBgJCw4CBAYkKC4bPR80RzddoExze1NB0FWIxWrv1GWUmdyvu93GYZ5Q7AAAAgFJREFUKM+tUtVy2wAQjJhZZrZjJ5LMzAxhJoeZy8zc767kNqk7zVOn+3g7eze3uyMj/wcYhuvA7poSBAICEAAixB80TsAoCAAMSYsiTzEoMawjQIikad5mkuSxoEPkUHxIiHK0edzpNvu92cZ9lyQy8O/FBMQ74gdZrzf+5NFR+oHLSoG3UgylTKHOUSFVL+ys9wpr004Wur2KA6I5/vl779vXva3N4+3ijN1KoTcPEYwQqF+f9o5PtHR6q7u04TGzDPJrMUw6xt9s7lZbbxvVUiKRn/UE3TSEDKQ4SJujfVX7oqmt4mIpo8xFIymJAvDBk5DNMjURbmtqrhkr1fL7L56mOzLLwMZFkHL4PZOPV9XESmW5vJZ/9Wzn+YnLROokBjOscyp70FxQzq7OcrGyuvFy/XXLY6UQ40nSFN9dShz2r87P32XCYW2xcVrIxK2kQYK0L6qUD9XM5fXldjPZ1mr5vZWJMYGDB6Q8p6y2tYv3Hz90c+GkUswpkyk/b5ike+eMLITVWvKiv99txmKV6r2U3cKSRjIYwrFydDb5MBv5lKwsx5SZ+mhAYklgEAwBUDaLfdoeckU78/ORyKjsM/Ec+DM0HIFIUXBLPrcl6ArJAUngSQC58R2HQYgjKZpnbYIgsDQHDJcI0ysEI3qJGB0ACBPYHb00+vd3Mf8JPwDEQVFKmgSbiAAAAABJRU5ErkJggg=="
                                    },
                                    b, d = MeStScanner.getInstance()._bases;
                                null !== c && (d = c);
                                for (b in d) {
                                    var g = d[b].layout,
                                        q = g.match(/t/g).length,
                                        p = g.match(/c/g).length;
                                    switch (ClientLib.Data.MainData.GetInstance().get_Player().get_Faction()) {
                                    case ClientLib.Base.EFactionType.GDIFaction:
                                        var m = "G";
                                        break;
                                    case ClientLib.Base.EFactionType.NODFaction:
                                        m = "N"
                                    }
                                    for (var l = "http://cncopt.com/?map=2|" + m + "|" + m + "||" + g + "....................................|newEconomy", h = '<table border="2" cellspacing="0" cellpadding="0" onclick="MeStScanner.Layout.window.getInstance().listener(' +
                                            d[b].id + ')">', h = h + ('<tr><td colspan="9"><font color="#FFF">' + d[b].x + ":" + d[b].y + '&nbsp;&nbsp;<img width="14" height="14" src="' + f.t + '"> ' + q + ' &nbsp;&nbsp; <img width="14" height="14" src="' + f.c + '"> ' + p + "</font></td></tr>"), k = 0; 72 > k; k++) {
                                        var C = k - 9 * Math.floor(k / 9);
                                        0 == C && (h += "<tr>");
                                        h += '<td><img width="14" height="14" src="' + f[g.charAt(k)] + '"></td>';
                                        8 == C && (h += "</tr>")
                                    }
                                    h += '</table><a href="' + l + '" target="_blank" style="color:#FFFFFF;">CNCOpt';
                                    this.resourceLayout = (new qx.ui.basic.Label).set({
                                        backgroundColor: "#303030",
                                        value: h,
                                        padding: 10,
                                        rich: !0
                                    });
                                    7 == q ? this.resourceLayout.setBackgroundColor("#202820") : 5 == q && this.resourceLayout.setBackgroundColor("#202028");
                                    this.ZW.push(this.resourceLayout)
                                }
                                this.ZY.removeAll();
                                f = 0;
                                this.row > f && (f = this.row);
                                for (a = b = 0; a < this.ZW.length; a++) this.ZY.add(this.ZW[a], {
                                    row: f,
                                    column: b
                                }), b++, 5 < b && (b = 0, f++, this.row++)
                            } catch (n) {
                                console.log(n)
                            }
                        }
                    }
                });
                qx.Class.define("MeStHIDE.window.container", {
                    extend: qx.ui.container.Composite,
                    construct: function (c) {
                        try {
                            qx.ui.container.Composite.call(this);
                            this.set({
                                layout: new qx.ui.layout.VBox(5),
                                padding: 5,
                                decorator: "pane-light-opaque"
                            });
                            switch (c) {
                            case "o":
                                console.log("add container o");
                                this.add((new qx.ui.basic.Label("Hide Outposts")).set({
                                    alignX: "center",
                                    font: "font_size_14_bold"
                                }));
                                var f = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                                f.add((new qx.ui.basic.Label(this.tr("level < "))).set({
                                    alignY: "middle"
                                }));
                                f.add(this.oLevel = (new qx.ui.form.Spinner(1)).set({
                                    maximum: 65,
                                    minimum: 1
                                }));
                                this.oLevel.addListener("changeValue", this.onInputo, this);
                                f.add(this.btnLevelo = (new qx.ui.form.Button("del")).set({
                                    toolTipText: "delete outposts from view"
                                }));
                                this.btnLevelo.addListener("execute", this.delo, this);
                                f.add(this.btnhideo = (new qx.ui.form.Button("hide")).set({
                                    toolTipText: "hide targetinfo from view"
                                }));
                                this.btnhideo.addListener("execute", this.hideo, this);
                                this.add(f);
                                break;
                            case "c":
                                console.log("add container c");
                                this.add((new qx.ui.basic.Label("Hide Camps")).set({
                                    alignX: "center",
                                    font: "font_size_14_bold"
                                }));
                                f = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                                f.add((new qx.ui.basic.Label(this.tr("level < "))).set({
                                    alignY: "middle"
                                }));
                                f.add(this.cLevel =
                                    (new qx.ui.form.Spinner(1)).set({
                                        maximum: 65,
                                        minimum: 1
                                    }));
                                this.cLevel.addListener("changeValue", this.onInputc, this);
                                f.add(this.btnLevelc = (new qx.ui.form.Button("del")).set({
                                    toolTipText: "delete camps from view"
                                }));
                                this.btnLevelc.addListener("execute", this.delc, this);
                                f.add(this.btnhidec = (new qx.ui.form.Button("hide")).set({
                                    toolTipText: "hide targetinfo from view"
                                }));
                                this.btnhidec.addListener("execute", this.hidec, this);
                                this.add(f);
                                break;
                            case "b":
                                console.log("add container b");
                                this.add((new qx.ui.basic.Label("Hide Bases")).set({
                                    alignX: "center",
                                    font: "font_size_14_bold"
                                }));
                                f = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                                f.add((new qx.ui.basic.Label(this.tr("level < "))).set({
                                    alignY: "middle"
                                }));
                                f.add(this.bLevel = (new qx.ui.form.Spinner(1)).set({
                                    maximum: 47,
                                    minimum: 1
                                }));
                                this.bLevel.addListener("changeValue", this.onInputb, this);
                                f.add(this.btnLevelb = (new qx.ui.form.Button("del")).set({
                                    toolTipText: "delete bases from view"
                                }));
                                this.btnLevelb.addListener("execute", this.delb, this);
                                f.add(this.btnhideb = (new qx.ui.form.Button("hide")).set({
                                    toolTipText: "hide targetinfo from view"
                                }));
                                this.btnhideb.addListener("execute", this.hideb, this);
                                this.add(f);
                                break;
                            case "p":
                                console.log("add container p");
                                this.add((new qx.ui.basic.Label("Hide Player")).set({
                                    alignX: "center",
                                    font: "font_size_14_bold"
                                }));
                                f = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                                f.add((new qx.ui.basic.Label(this.tr("level < "))).set({
                                    alignY: "middle"
                                }));
                                f.add(this.pLevel = (new qx.ui.form.Spinner(1)).set({
                                    maximum: 65,
                                    minimum: 1
                                }));
                                this.pLevel.addListener("changeValue", this.onInputp, this);
                                f.add(this.btnLevelp = (new qx.ui.form.Button("del")).set({
                                    toolTipText: "delete player from viev"
                                }));
                                this.btnLevelp.addListener("execute", this.delp, this);
                                f.add(this.btnhidep = (new qx.ui.form.Button("hide")).set({
                                    toolTipText: "hide targetinfo from view"
                                }));
                                this.btnhidep.addListener("execute", this.hidep, this);
                                this.add(f);
                                break;
                            case "reset":
                                console.log("add container p");
                                this.add((new qx.ui.basic.Label("Reset all")).set({
                                    alignX: "center",
                                    font: "font_size_14_bold"
                                }));
                                f = new qx.ui.container.Composite(new qx.ui.layout.HBox(5, "center"));
                                f.add(this.btnReset = (new qx.ui.form.Button("reset")).set({
                                    toolTipText: "Reset view"
                                }));
                                this.btnReset.addListener("execute", this.reset, this);
                                this.add(f);
                                break;
                            default:
                                console.log("add container default"), this.add((new qx.ui.basic.Label("Hide all")).set({
                                        alignX: "center",
                                        font: "font_size_14_bold"
                                    })), f = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)), f.add((new qx.ui.basic.Label(this.tr("level < "))).set({
                                        alignY: "middle"
                                    })), f.add(this.aLevel = (new qx.ui.form.Spinner(1)).set({
                                        maximum: 65,
                                        minimum: 1
                                    })), this.aLevel.addListener("changeValue", this.onInputa, this), f.add(this.btnLevela = (new qx.ui.form.Button("del")).set({
                                        toolTipText: "delete all targets from view"
                                    })),
                                    this.btnLevela.addListener("execute", this.dela, this), f.add(this.btnhidea = (new qx.ui.form.Button("hide")).set({
                                        toolTipText: "hide targetinfo from view"
                                    })), this.btnhidea.addListener("execute", this.hidea, this), this.add(f)
                            }
                            this.dirtySectors = {}
                        } catch (b) {
                            console.log("Error setting up MeStHIDE.window.container Constructor: "), console.log(b.toString())
                        }
                    },
                    destruct: function () {},
                    members: {
                        dirtySectors: null,
                        oLevel: null,
                        btnHideCurrent: null,
                        btndelCurrent: null,
                        cLevel: null,
                        bLevel: null,
                        pLevel: null,
                        aLevel: null,
                        btnLevelo: null,
                        btnLevelc: null,
                        btnLevelb: null,
                        btnLevelp: null,
                        btnLevela: null,
                        btnReset: null,
                        btnhideo: null,
                        btnhidec: null,
                        btnhideb: null,
                        btnhidep: null,
                        btnhidea: null,
                        markDirty: function (c) {
                            c.get_Id() in this.dirtySectors || (this.dirtySectors[c.get_Id()] = {
                                alliance: [],
                                player: []
                            })
                        },
                        onTick: function () {
                            this.onInput()
                        },
                        onInputo: function () {
                            this.onInput("o")
                        },
                        onInputc: function () {
                            this.onInput("c")
                        },
                        onInputb: function () {
                            this.onInput("b")
                        },
                        onInputp: function () {
                            this.onInput("p")
                        },
                        onInputa: function () {
                            this.onInput("a")
                        },
                        hideo: function () {
                            this.hide("o")
                        },
                        hidec: function () {
                            this.hide("c")
                        },
                        hideb: function () {
                            this.hide("b")
                        },
                        hidep: function () {
                            this.hide("p")
                        },
                        hidea: function () {
                            this.hide("a")
                        },
                        delo: function () {
                            this.del("o")
                        },
                        delc: function () {
                            this.del("c")
                        },
                        delb: function () {
                            this.del("b")
                        },
                        delp: function () {
                            this.del("p")
                        },
                        dela: function () {
                            this.del("a")
                        },
                        onInput: function (c) {
                            switch (c) {
                            case "o":
                                var f = parseInt(this.oLevel.getValue(), 10);
                                break;
                            case "c":
                                f = parseInt(this.cLevel.getValue(), 10);
                                break;
                            case "p":
                                f = parseInt(this.pLevel.getValue(), 10);
                                break;
                            case "b":
                                f = parseInt(this.bLevel.getValue(),
                                    10);
                                break;
                            case "a":
                                f = parseInt(this.aLevel.getValue(), 10)
                            }
                            console.log("value is " + f + " from " + c)
                        },
                        del: function (c) {
                            for (var f = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(), b = f.get_X(), f = f.get_Y(), d = ClientLib.Data.MainData.GetInstance().get_World(), g = ClientLib.Vis.VisMain.GetInstance().get_Region(), h = b - 16; h < b + 16; h++)
                                for (var p = f - 16; p < f + 16; p++) {
                                    var m = g.GetObjectFromPosition(h * g.get_GridWidth(), p * g.get_GridHeight());
                                    if (null != m) {
                                        var l = d.GetWorldSectorByCoords(h, p);
                                        "function" === typeof m.get_BaseLevel &&
                                            (m.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp && (2 === m.get_CampType() && "c" == c && Math.floor(m.get_BaseLevel()) < parseInt(this.cLevel.getValue(), 10) && (m.Dispose(), this.markDirty(l)), 3 === m.get_CampType() && "o" == c && Math.floor(m.get_BaseLevel()) < parseInt(this.oLevel.getValue(), 10) && (m.Dispose(), this.markDirty(l)), 0 === m.get_CampType() && (m.Dispose(), this.markDirty(l))), m.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType && "p" == c && Math.floor(m.get_BaseLevel()) <
                                                parseInt(this.pLevel.getValue(), 10) && !m.IsOwnBase() && (m.Dispose(), this.markDirty(l)), m.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionNPCBase && "b" == c && Math.floor(m.get_BaseLevel()) < parseInt(this.bLevel.getValue(), 10) && (m.Dispose(), this.markDirty(l)), "a" == c && Math.floor(m.get_BaseLevel()) < parseInt(this.aLevel.getValue(), 10) && ("function" === typeof m.IsOwnBase ? m.IsOwnBase() || (m.Dispose(), this.markDirty(l)) : (m.Dispose(), this.markDirty(l))))
                                    }
                                }
                            console.log(this.dirtySectors)
                        },
                        hide: function (c) {
                            for (var f =
                                    ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(), b = f.get_X(), f = f.get_Y(), d = ClientLib.Vis.VisMain.GetInstance().get_Region(), g = b - 16; g < b + 16; g++)
                                for (var h = f - 16; h < f + 16; h++) {
                                    var p = d.GetObjectFromPosition(g * d.get_GridWidth(), h * d.get_GridHeight());
                                    null != p && "function" === typeof p.get_BaseLevel && (p.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp && (2 === p.get_CampType() && "c" == c && Math.floor(p.get_BaseLevel()) < parseInt(this.cLevel.getValue(), 10) && p.HideInfos(), 3 ===
                                            p.get_CampType() && "o" == c && Math.floor(p.get_BaseLevel()) < parseInt(this.oLevel.getValue(), 10) && p.HideInfos(), 0 === p.get_CampType() && p.HideInfos()), p.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType && "p" == c && Math.floor(p.get_BaseLevel()) < parseInt(this.pLevel.getValue(), 10) && (p.IsOwnBase() || p.HideInfos()), p.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionNPCBase && "b" == c && Math.floor(p.get_BaseLevel()) < parseInt(this.bLevel.getValue(), 10) && p.HideInfos(), "a" == c && Math.floor(p.get_BaseLevel()) <
                                        parseInt(this.aLevel.getValue(), 10) && ("function" === typeof p.IsOwnBase ? p.IsOwnBase() || p.HideInfos() : p.HideInfos()))
                                }
                        },
                        reset: function (c) {
                            console.log("reset view");
                            this.showAll()
                        },
                        showAll: function () {
                            try {
                                ClientLib.Vis.VisMain.GetInstance().get_Region().ShowAllPlates()
                            } catch (c) {
                                console.log(c)
                            }
                        }
                    }
                });
                qx.Class.define("MeStHIDE.window.Window", {
                    type: "singleton",
                    extend: qx.ui.window.Window,
                    construct: function () {
                        try {
                            this.base(arguments), this.set({
                                layout: (new qx.ui.layout.VBox).set({
                                    spacing: 0
                                }),
                                contentPadding: 5,
                                contentPaddingTop: 0,
                                allowMaximize: !1,
                                showMaximize: !1,
                                allowMinimize: !1,
                                showMinimize: !1,
                                resizable: !1
                            }), this.setCaption("Hide targets"), this.moveTo(150, 50), this.add(new MeStHIDE.window.container("o")), this.add(new MeStHIDE.window.container("c")), this.add(new MeStHIDE.window.container("b")), this.add(new MeStHIDE.window.container("p")), this.add(new MeStHIDE.window.container("a")), this.add(new MeStHIDE.window.container("reset")), this.addListener("appear", this.onOpen, this), this.addListener("close", this.onClose,
                                this)
                        } catch (c) {
                            console.log("Error setting up MeStHIDE.window.Window Constructor: "), console.log(c.toString())
                        }
                    },
                    destruct: function () {},
                    members: {
                        view: {},
                        onOpen: function () {
                            console.log("Window onOpen ")
                        },
                        onClose: function () {
                            console.log("Window onClose ")
                        },
                        initialize: function () {
                            try {
                                MeStmain.getInstance().AddMainMenu("Hide targets", function () {
                                    MeStHIDE.window.Window.getInstance().open()
                                }, "ALT+h"), phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange,
                                    this, this.viewChangeHandler), this.btnHideCurrent = new qx.ui.form.Button("Hide"), this.btnHideCurrent.set({
                                    width: 50,
                                    appearance: "button-text-small",
                                    toolTipText: "Hide From Map"
                                }), this.btnHideCurrent.addListener("click", this.hideCurrent, this), this.btndelCurrent = new qx.ui.form.Button("del"), this.btndelCurrent.set({
                                    width: 50,
                                    appearance: "button-text-small",
                                    toolTipText: "Delete From Map"
                                }), this.btndelCurrent.addListener("click", this.delCurrent, this)
                            } catch (c) {
                                k(c)
                            }
                        },
                        viewChangeHandler: function (c, f) {
                            try {
                                var b = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.OVL_PLAYAREA),
                                    d = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                                null != d && ((this.view.ownCity = d === ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(), this.view.ownCity || f !== ClientLib.Vis.Mode.CombatSetup) ? c === ClientLib.Vis.Mode.CombatSetup && (b.remove(this.btnHideCurrent), b.remove(this.btndelCurrent)) : (b.add(this.btnHideCurrent, {
                                    right: 1,
                                    top: 33
                                }), b.add(this.btndelCurrent, {
                                    right: 1,
                                    top: 60
                                })))
                            } catch (g) {
                                console.log(g)
                            }
                        },
                        hideCurrent: function () {
                            try {
                                var c = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(),
                                    f = c.get_PosX(),
                                    b = c.get_PosY(),
                                    d = ClientLib.Vis.VisMain.GetInstance().get_Region();
                                d.GetObjectFromPosition(f * d.get_GridWidth(), b * d.get_GridHeight()).HideInfos();
                                qx.core.Init.getApplication().getMainOverlay()._onClose()
                            } catch (g) {
                                console.log(g)
                            }
                        },
                        delCurrent: function () {
                            console.log("___________del___________");
                            try {
                                var c = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(),
                                    f = c.get_PosX(),
                                    b = c.get_PosY(),
                                    d = ClientLib.Vis.VisMain.GetInstance().get_Region();
                                d.GetObjectFromPosition(f * d.get_GridWidth(),
                                    b * d.get_GridHeight()).Dispose();
                                qx.core.Init.getApplication().getMainOverlay()._onClose()
                            } catch (g) {
                                console.log(g)
                            }
                        }
                    }
                });
                h.xhr = {
                    _load: !1,
                    _xhr: null,
                    _timeout: 3E3,
                    start: function () {
                        var c = null;
                        if (window.XMLHttpRequest) c = new XMLHttpRequest;
                        else if (window.ActiveXObject) try {
                            c = new ActiveXObject("Msxml2.XMLHTTP.6.0")
                        } catch (b) {
                            try {
                                c = new ActiveXObject("Msxml2.XMLHTTP.3.0")
                            } catch (S) {
                                var f = {
                                    func: "start",
                                    "class": "MeSt.xhr"
                                };
                                f.error = S;
                                k(S);
                                beta && E(S, f)
                            }
                        }
                        if (null === c) return !1;
                        h.xhr._load = !0;
                        h.xhr._xhr = c;
                        h.xhr._xhr.timeout =
                            h.xhr._timeout;
                        return h.xhr._load
                    },
                    send: function (c, f, b, d, g) {
                        try {
                            if (null !== h.xhr._xhr)
                                if (!1 !== h.xhr._load && null !== h.xhr._xhr) {
                                    h.xhr._xhr.open(f, c, !0);
                                    if (null !== b && "object" == typeof b)
                                        for (var q in b) b[q].hasOwnProperty("name") && b[q].hasOwnProperty("value") && h.xhr._xhr.setRequestHeader(b[q].name, b[q].value);
                                    h.xhr._xhr.onload = function () {
                                        try {
                                            if (4 == h.xhr._xhr.readyState)
                                                if (200 == h.xhr._xhr.status)
                                                    if ("function" == typeof g) g(h.xhr._xhr.responseText);
                                                    else {
                                                        var b = {
                                                                func: "send",
                                                                "class": "MeSt.xhr"
                                                            },
                                                            c = "typeof callback !== function";
                                                        b.error = c;
                                                        k(c);
                                                        beta && E(c, b)
                                                    }
                                            else b = {
                                                func: "send",
                                                "class": "MeSt.xhr"
                                            }, c = "MeSt.xhr._xhr.status !== 200", b.error = c, k(c), beta && E(c, b)
                                        } catch (l) {
                                            b = {
                                                func: "send MeSt.xhr._xhr.onreadystatechange",
                                                "class": "MeSt.xhr"
                                            }, b.error = l, k(l), beta && E(l, b)
                                        }
                                    };
                                    h.xhr._xhr.ontimeout = function () {
                                        var b = {
                                            func: "MeSt.xhr._xhr.onerror",
                                            "class": "MeSt.xhr",
                                            error: "ontimeout"
                                        };
                                        k("ontimeout");
                                        beta && E("ontimeout", b)
                                    };
                                    null !== d ? "stringify" == JSON.isjson(d) && !0 === Array.isarray(d) || !0 === Object.isobj(d) && "stringify" == JSON.isjson(d) ? h.xhr._xhr.send(JSON.stringify(d)) :
                                        (c = {
                                            func: "send",
                                            "class": "MeSt.xhr",
                                            error: "Array.isarray(data) && JSON.isjson(data) === 'stringify' || Object.isabj(data) JSON.isjson(data) === 'stringify'"
                                        }, k("Array.isarray(data) && JSON.isjson(data) === 'stringify' || Object.isabj(data) JSON.isjson(data) === 'stringify'"), beta && E("Array.isarray(data) && JSON.isjson(data) === 'stringify' || Object.isabj(data) JSON.isjson(data) === 'stringify'", c)) : h.xhr._xhr.send(null)
                                } else alert("Ihr Browser unterstuetzt kein Ajax!")
                        } catch (p) {
                            c = {
                                func: "send MeSt.xhr._xhr.onreadystatechange",
                                "class": "MeSt.xhr"
                            }, c.error = p, k(p), beta && E(p, c)
                        }
                    }
                };
                h.xhr = h.xhr;
                h.xhr.start = h.xhr.start;
                h.xhr.name = "MeSt.xhr";
                window.MeSt = h;
                return !0
            }

            function X(h) {
                var k = [],
                    d;
                for (d in h)
                    if ("object" == typeof h[d] && h[d])
                        for (var c in h[d])
                            if (376877 <= PerforceChangelist) {
                                if ("object" == typeof h[d][c] && h[d][c] && "d" in h[d][c]) {
                                    var f = h[d][c].d;
                                    if ("object" == typeof f && f)
                                        for (var b in f) "object" == typeof f[b] && f[b] && "get_CurrentLevel" in f[b] && k.push(f)
                                }
                            } else if ("object" == typeof h[d][c] && h[d][c] && "l" in h[d][c] && (f = h[d][c].l, "object" ==
                        typeof f && f))
                    for (b in f) "object" == typeof f[b] && f[b] && "get_CurrentLevel" in f[b] && k.push(f);
                return k
            }

            function V(h, C, d) {
                k("CNCOpt Link loaded");
                var c = {
                    selected_base: null,
                    keymap: {
                        GDI_Accumulator: "a",
                        GDI_Refinery: "r",
                        "GDI_Trade Center": "u",
                        GDI_Silo: "s",
                        "GDI_Power Plant": "p",
                        "GDI_Construction Yard": "y",
                        GDI_Airport: "d",
                        GDI_Barracks: "b",
                        GDI_Factory: "f",
                        "GDI_Defense HQ": "q",
                        "GDI_Defense Facility": "w",
                        "GDI_Command Center": "e",
                        GDI_Support_Art: "z",
                        GDI_Support_Air: "x",
                        GDI_Support_Ion: "i",
                        FOR_Silo: "s",
                        FOR_Refinery: "r",
                        "FOR_Tiberium Booster": "b",
                        "FOR_Crystal Booster": "v",
                        "FOR_Trade Center": "u",
                        "FOR_Defense Facility": "w",
                        "FOR_Construction Yard": "y",
                        FOR_Harvester_Tiberium: "h",
                        "FOR_Defense HQ": "q",
                        FOR_Harvester_Crystal: "n",
                        NOD_Refinery: "r",
                        "NOD_Power Plant": "p",
                        NOD_Harvester: "h",
                        "NOD_Construction Yard": "y",
                        NOD_Airport: "d",
                        "NOD_Trade Center": "u",
                        "NOD_Defense HQ": "q",
                        NOD_Barracks: "b",
                        NOD_Silo: "s",
                        NOD_Factory: "f",
                        NOD_Harvester_Crystal: "n",
                        "NOD_Command Post": "e",
                        NOD_Support_Art: "z",
                        NOD_Support_Ion: "i",
                        NOD_Accumulator: "a",
                        NOD_Support_Air: "x",
                        "NOD_Defense Facility": "w",
                        GDI_Wall: "w",
                        GDI_Cannon: "c",
                        "GDI_Antitank Barrier": "t",
                        GDI_Barbwire: "b",
                        GDI_Turret: "m",
                        GDI_Flak: "f",
                        "GDI_Art Inf": "r",
                        "GDI_Art Air": "e",
                        "GDI_Art Tank": "a",
                        "GDI_Def_APC Guardian": "g",
                        "GDI_Def_Missile Squad": "q",
                        GDI_Def_Pitbull: "p",
                        GDI_Def_Predator: "d",
                        GDI_Def_Sniper: "s",
                        "GDI_Def_Zone Trooper": "z",
                        "NOD_Def_Antitank Barrier": "t",
                        "NOD_Def_Art Air": "e",
                        "NOD_Def_Art Inf": "r",
                        "NOD_Def_Art Tank": "a",
                        "NOD_Def_Attack Bike": "p",
                        NOD_Def_Barbwire: "b",
                        "NOD_Def_Black Hand": "z",
                        NOD_Def_Cannon: "c",
                        NOD_Def_Confessor: "s",
                        NOD_Def_Flak: "f",
                        "NOD_Def_MG Nest": "m",
                        "NOD_Def_Militant Rocket Soldiers": "q",
                        NOD_Def_Reckoner: "g",
                        "NOD_Def_Scorpion Tank": "d",
                        NOD_Def_Wall: "w",
                        FOR_Wall: "w",
                        FOR_Barbwire_VS_Inf: "b",
                        FOR_Barrier_VS_Veh: "t",
                        FOR_Inf_VS_Inf: "g",
                        FOR_Inf_VS_Veh: "r",
                        FOR_Inf_VS_Air: "q",
                        FOR_Sniper: "n",
                        FOR_Mammoth: "y",
                        FOR_Veh_VS_Inf: "o",
                        FOR_Veh_VS_Veh: "s",
                        FOR_Veh_VS_Air: "u",
                        FOR_Turret_VS_Inf: "m",
                        FOR_Turret_VS_Inf_ranged: "a",
                        FOR_Turret_VS_Veh: "v",
                        FOR_Turret_VS_Veh_ranged: "d",
                        FOR_Turret_VS_Air: "f",
                        FOR_Turret_VS_Air_ranged: "e",
                        "GDI_APC Guardian": "g",
                        GDI_Commando: "c",
                        GDI_Firehawk: "f",
                        GDI_Juggernaut: "j",
                        GDI_Kodiak: "k",
                        GDI_Mammoth: "m",
                        "GDI_Missile Squad": "q",
                        GDI_Orca: "o",
                        GDI_Paladin: "a",
                        GDI_Pitbull: "p",
                        GDI_Predator: "d",
                        GDI_Riflemen: "r",
                        "GDI_Sniper Team": "s",
                        "GDI_Zone Trooper": "z",
                        "NOD_Attack Bike": "b",
                        NOD_Avatar: "a",
                        "NOD_Black Hand": "z",
                        NOD_Cobra: "r",
                        NOD_Commando: "c",
                        NOD_Confessor: "s",
                        "NOD_Militant Rocket Soldiers": "q",
                        NOD_Militants: "m",
                        NOD_Reckoner: "k",
                        NOD_Salamander: "l",
                        "NOD_Scorpion Tank": "o",
                        "NOD_Specter Artilery": "p",
                        NOD_Venom: "v",
                        NOD_Vertigo: "t",
                        "<last>": "."
                    },
                    make_sharelink: function () {
                        try {
                            var f = c.selected_base,
                                b = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(f),
                                h = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(),
                                g = ClientLib.Data.MainData.GetInstance().get_Alliance(),
                                q = ClientLib.Data.MainData.GetInstance().get_Server();
                            tbase = f;
                            tcity = b;
                            scity = h;
                            f = "http://cncopt.com/?map=";
                            f += "3|";
                            switch (b.get_CityFaction()) {
                            case 1:
                                f += "G|";
                                break;
                            case 2:
                                f += "N|";
                                break;
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                f +=
                                    "F|";
                                break;
                            default:
                                k("cncopt: Unknown faction: " + b.get_CityFaction()), f += "E|"
                            }
                            switch (h.get_CityFaction()) {
                            case 1:
                                f += "G|";
                                break;
                            case 2:
                                f += "N|";
                                break;
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                f += "F|";
                                break;
                            default:
                                k("cncopt: Unknown faction: " + h.get_CityFaction()), f += "E|"
                            }
                            f += b.get_Name() + "|";
                            defense_units = [];
                            for (h = 0; 20 > h; ++h) {
                                for (var p = [], m = 0; 9 > m; ++m) p.push(null);
                                defense_units.push(p)
                            }
                            var l;
                            a: {
                                for (var r = X(b), B = 0; B < r.length; ++B)
                                    for (var D in r[B])
                                        if (r[B][D].get_UnitGameData_Obj().n in aa) {
                                            l = r[B];
                                            break a
                                        }
                                l = []
                            }
                            if (376877 <=
                                PerforceChangelist)
                                for (h in l) {
                                    var n = l[h];
                                    defense_units[n.get_CoordX()][n.get_CoordY() + 8] = n
                                } else
                                    for (h = 0; h < l.length; ++h) n = l[h], defense_units[n.get_CoordX()][n.get_CoordY() + 8] = n;
                            offense_units = [];
                            for (h = 0; 20 > h; ++h) {
                                p = [];
                                for (m = 0; 9 > m; ++m) p.push(null);
                                offense_units.push(p)
                            }
                            var t;
                            a: {
                                for (var x = X(b), p = 0; p < x.length; ++p)
                                    for (var A in x[p])
                                        if (x[p][A].get_UnitGameData_Obj().n in ba) {
                                            t = x[p];
                                            break a
                                        }
                                t = []
                            }
                            if (376877 <= PerforceChangelist)
                                for (h in t) n = t[h], offense_units[n.get_CoordX()][n.get_CoordY() + 16] = n;
                            else
                                for (h =
                                    0; h < t.length; ++h) n = t[h], offense_units[n.get_CoordX()][n.get_CoordY() + 16] = n;
                            var v;
                            a: {
                                for (var w in b)
                                    if ("object" == typeof b[w] && b[w] && 0 in b[w] && 8 in b[w] && "object" == typeof b[w][0] && b[w][0] && b[w][0] && 0 in b[w][0] && 15 in b[w][0] && "object" == typeof b[w][0][0] && b[w][0][0] && "BuildingIndex" in b[w][0][0]) {
                                        v = b[w];
                                        break a
                                    }
                                v = null
                            }
                            var y;
                            a: {
                                var z = b.get_CityBuildingsData(),
                                    u;
                                for (u in z)
                                    if (376877 <= PerforceChangelist) {
                                        if ("object" === typeof z[u] && z[u] && "d" in z[u] && "c" in z[u] && 0 < z[u].c) {
                                            y = z[u].d;
                                            break a
                                        }
                                    } else if ("object" ===
                                    typeof z[u] && z[u] && "l" in z[u]) {
                                    y = z[u].l;
                                    break a
                                }
                                y = void 0
                            }
                            for (h = 0; 20 > h; ++h)
                                for (row = [], m = 0; 9 > m; ++m) {
                                    var E = 16 < h ? null : v[m][h],
                                        n = 0;
                                    t = null;
                                    E && 0 <= E.BuildingIndex && (t = y[E.BuildingIndex], n = t.get_CurrentLevel());
                                    var F = defense_units[m][h];
                                    F && (n = F.get_CurrentLevel());
                                    var H = offense_units[m][h];
                                    H && (n = H.get_CurrentLevel());
                                    1 < n && (f += n);
                                    switch (16 < h ? 0 : b.GetResourceType(m, h)) {
                                    case 0:
                                        if (t) {
                                            var J = t.get_MdbBuildingId();
                                            GAMEDATA.Tech[J].n in c.keymap ? f += c.keymap[GAMEDATA.Tech[J].n] : (k("cncopt [5]: Unhandled building: " +
                                                J, t), f += ".")
                                        } else F ? F.get_UnitGameData_Obj().n in c.keymap ? f += c.keymap[F.get_UnitGameData_Obj().n] : (k("cncopt [5]: Unhandled unit: " + F.get_UnitGameData_Obj().n), f += ".") : H ? H.get_UnitGameData_Obj().n in c.keymap ? f += c.keymap[H.get_UnitGameData_Obj().n] : (k("cncopt [5]: Unhandled unit: " + H.get_UnitGameData_Obj().n), f += ".") : f += ".";
                                        break;
                                    case 1:
                                        f = 0 > E.BuildingIndex ? f + "c" : f + "n";
                                        break;
                                    case 2:
                                        f = 0 > E.BuildingIndex ? f + "t" : f + "h";
                                        break;
                                    case 4:
                                        f += "j";
                                        break;
                                    case 5:
                                        f += "h";
                                        break;
                                    case 6:
                                        f += "l";
                                        break;
                                    case 7:
                                        f += "k";
                                        break;
                                    default:
                                        k("cncopt [4]: Unhandled resource type: " + b.GetResourceType(m, h)), f += "."
                                    }
                                }
                            g && scity.get_AllianceId() == tcity.get_AllianceId() && (f += "|" + g.get_POITiberiumBonus(), f += "|" + g.get_POICrystalBonus(), f += "|" + g.get_POIPowerBonus(), f += "|" + g.get_POIInfantryBonus(), f += "|" + g.get_POIVehicleBonus(), f += "|" + g.get_POIAirBonus(), f += "|" + g.get_POIDefenseBonus());
                            1.2 !== q.get_TechLevelUpgradeFactorBonusAmount() && (f += "|newEconomy");
                            d.setFormField("opt" + C, f);
                            return f
                        } catch (I) {
                            k("cncopt [1]: ", I)
                        }
                    }
                };
                c.selected_base = h;
                c.make_sharelink()
            }

            function Z(h, k) {
                MeStmain.getInstance().remoteRequest("update", k)
            }

            function E(h, k) {
                var d = {};
                d.func = k.func;
                d["class"] = k["class"];
                d.message = h.message;
                d.error = h.stack;
                MainData = ClientLib.Data.MainData.GetInstance();
                B = MainData.get_Player();
                d.playerName = B.get_Name();
                d.accountId = B.get_AccountId();
                server = MainData.get_Server();
                d.worldId = server.get_WorldId();
                d.clientinfo = ca();
                var c = null;
                console.log("____________________________Mest5-errorreport->send______________________________________");
                console.log(d);
                console.log("_________________________________________________________________________________________");
                if (window.XMLHttpRequest) c = new XMLHttpRequest;
                else if (window.ActiveXObject) try {
                    c = new ActiveXObject("Msxml2.XMLHTTP.6.0")
                } catch (f) {
                    try {
                        c = new ActiveXObject("Msxml2.XMLHTTP.3.0")
                    } catch (b) {
                        console.log(b)
                    }
                }
                null !== c && c.open("POST", "https://www.member-stats.de/playerinfo.php?i=error", !0);
                c.onreadystatechange = function () {
                    4 == this.readyState && (200 == this.status ? console.log(h) : console.log(this.statusText))
                };
                c.send(JSON.stringify(d))
            }

            function ca() {
                var h = navigator.userAgent.toLowerCase(),
                    k = function (b) {
                        return b.test(h)
                    },
                    d = k(/opera/),
                    c = k(/chrome/),
                    f = k(/webkit/),
                    b = !c && k(/safari/);
                b && k(/applewebkit\/4/);
                b && k(/version\/3/);
                b && k(/version\/4/);
                var r = !d && k(/msie/),
                    g = r && k(/msie 7/),
                    q = r && k(/msie 8/),
                    p = r && !g && !q,
                    m = !f && k(/gecko/),
                    l = m && k(/rv:1\.8/),
                    B = m && k(/rv:1\.9/),
                    D = k(/windows|win32/),
                    E = k(/macintosh|mac os x/);
                k(/adobeair/);
                var n = k(/linux/);
                /^https/i.test(window.location.protocol);
                var t = "",
                    x = k = "",
                    A = "",
                    h = navigator.userAgent.toLowerCase(),
                    k = function (b) {
                        return b.test(h)
                    };
                D ? (A = "Windows", k(/windows nt/) && (A = h.indexOf("windows nt"), D = h.indexOf(";", A), A = h.substring(A, D))) : A = E ? "Mac" : n ? "Linux" : "Other";
                r ? (t = k = "IE", x = h.indexOf("msie") + 5, l = h.indexOf(";", x), x = h.substring(x, l), t = p ? "IE6" : g ? "IE7" : q ? "IE8" : "IE") : m ? (k = (g = k(/firefox/)) ? "Firefox" : "Others", t = l ? "Gecko2" : B ? "Gecko3" : "Gecko", g && (x = h.indexOf("firefox") + 8, l = h.indexOf(" ", x), -1 == l && (l = h.length), x = h.substring(x, l))) : c ? (k = "Chrome", t = f ? "Web Kit" : "Other", x = h.indexOf("chrome") + 7, l = h.indexOf(" ",
                    x), x = h.substring(x, l)) : k = d ? "Opera" : b ? "Safari" : "";
                g = {};
                g.javascript = t;
                g.browserType = k;
                g.browserVersion = x;
                g.osName = A;
                return g
            }

            function Q() {
                try {
                    if ("undefined" !== typeof qx) {
                        var h = qx.core.Init.getApplication(),
                            r = qx.core.Init.getApplication().getMenuBar();
                        h && r ? (B = ClientLib.Data.MainData.GetInstance().get_Player(), 0 !== B.id ? (Y(), window.MeStmain.getInstance().initialize(), window.MeStScanner.getInstance().initialize(), window.MeStstorage.getInstance().initialize(), window.MeStxhr.getInstance().initialize(), MeStHIDE.window.Window.getInstance().initialize(),
                            window.MeSt.xhr.start()) : window.setTimeout(Q, 1E3)) : window.setTimeout(Q, 1E3)
                    } else window.setTimeout(Q, 1E3)
                } catch (d) {
                    k(d), window.setTimeout(Q, 1E3)
                }
            }

            function k(h) {
                h = "[MeSt] " + h;
                "undefined" !== typeof console ? console.log(h) : window.opera ? opera.postError(h) : GM_log(h)
            }
            var B = 0,
                T = 0,
                J = null,
                r = null,
                W = null,
                H = null,
                D = null,
                R = 0,
                U = 0,
                aa = {
                    GDI_Wall: "w",
                    GDI_Cannon: "c",
                    "GDI_Antitank Barrier": "t",
                    GDI_Barbwire: "b",
                    GDI_Turret: "m",
                    GDI_Flak: "f",
                    "GDI_Art Inf": "r",
                    "GDI_Art Air": "e",
                    "GDI_Art Tank": "a",
                    "GDI_Def_APC Guardian": "g",
                    "GDI_Def_Missile Squad": "q",
                    GDI_Def_Pitbull: "p",
                    GDI_Def_Predator: "d",
                    GDI_Def_Sniper: "s",
                    "GDI_Def_Zone Trooper": "z",
                    "NOD_Def_Antitank Barrier": "t",
                    "NOD_Def_Art Air": "e",
                    "NOD_Def_Art Inf": "r",
                    "NOD_Def_Art Tank": "a",
                    "NOD_Def_Attack Bike": "p",
                    NOD_Def_Barbwire: "b",
                    "NOD_Def_Black Hand": "z",
                    NOD_Def_Cannon: "c",
                    NOD_Def_Confessor: "s",
                    NOD_Def_Flak: "f",
                    "NOD_Def_MG Nest": "m",
                    "NOD_Def_Militant Rocket Soldiers": "q",
                    NOD_Def_Reckoner: "g",
                    "NOD_Def_Scorpion Tank": "d",
                    NOD_Def_Wall: "w",
                    FOR_Wall: "w",
                    FOR_Barbwire_VS_Inf: "b",
                    FOR_Barrier_VS_Veh: "t",
                    FOR_Inf_VS_Inf: "g",
                    FOR_Inf_VS_Veh: "r",
                    FOR_Inf_VS_Air: "q",
                    FOR_Sniper: "n",
                    FOR_Mammoth: "y",
                    FOR_Veh_VS_Inf: "o",
                    FOR_Veh_VS_Veh: "s",
                    FOR_Veh_VS_Air: "u",
                    FOR_Turret_VS_Inf: "m",
                    FOR_Turret_VS_Inf_ranged: "a",
                    FOR_Turret_VS_Veh: "v",
                    FOR_Turret_VS_Veh_ranged: "d",
                    FOR_Turret_VS_Air: "f",
                    FOR_Turret_VS_Air_ranged: "e",
                    "": ""
                },
                ba = {
                    "GDI_APC Guardian": "g",
                    GDI_Commando: "c",
                    GDI_Firehawk: "f",
                    GDI_Juggernaut: "j",
                    GDI_Kodiak: "k",
                    GDI_Mammoth: "m",
                    "GDI_Missile Squad": "q",
                    GDI_Orca: "o",
                    GDI_Paladin: "a",
                    GDI_Pitbull: "p",
                    GDI_Predator: "d",
                    GDI_Riflemen: "r",
                    "GDI_Sniper Team": "s",
                    "GDI_Zone Trooper": "z",
                    "NOD_Attack Bike": "b",
                    NOD_Avatar: "a",
                    "NOD_Black Hand": "z",
                    NOD_Cobra: "r",
                    NOD_Commando: "c",
                    NOD_Confessor: "s",
                    "NOD_Militant Rocket Soldiers": "q",
                    NOD_Militants: "m",
                    NOD_Reckoner: "k",
                    NOD_Salamander: "l",
                    "NOD_Scorpion Tank": "o",
                    "NOD_Specter Artilery": "p",
                    NOD_Venom: "v",
                    NOD_Vertigo: "t",
                    "": ""
                };
            /commandandconquer\.com/i.test(document.domain) && window.setTimeout(Q, 1E3)
        },
        MeStScript = document.createElement("script"),
        txt = MeSt_mainFunction.toString();
    MeStScript.innerHTML = "(" + txt + ")();";
    MeStScript.type = "text/javascript";
    /commandandconquer\.com/i.test(document.domain) && document.getElementsByTagName("head")[0].appendChild(MeStScript);
})();