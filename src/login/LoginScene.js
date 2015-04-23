var ws = null;
var LoginLayer = cc.Layer.extend({
    tf_Account:null,
    tf_Passwd:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var self = this;

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        var mainscene = ccs.load(res.Login_json);
        this.addChild(mainscene.node);
        
        this.tf_Account = mainscene.node.getChildByTag(31);
        this.tf_Account.addEventListenerTextField(function(target, evt){
            localStorage.setItem("tf_Account", target.getString());
        },this.tf_Account);
        var cb_def_accout = mainscene.node.getChildByTag(16);
        cb_def_accout.addEventListenerCheckBox(function(state){
            if(state.getSelectedState()){
                //获取默认账号
                self.tf_Account.setString(localStorage.getItem("udid"));
                self.tf_Account.ignoreContentAdaptWithSize(true);
            }else {
                //
                self.tf_Account.setString(localStorage.getItem("tf_Account"));
                self.tf_Account.ignoreContentAdaptWithSize(true);
            }
            localStorage.setItem("cb_def_accout", state.getSelectedState());
        });

        cb_def_accout.setSelectedState(localStorage.getItem("cb_def_accout") == "true")
        if(cb_def_accout.getSelectedState()){
            //获取默认账号
            self.tf_Account.setString(localStorage.getItem("udid"));
            self.tf_Account.ignoreContentAdaptWithSize(true);
        }else {
            //
            self.tf_Account.setString(localStorage.getItem("tf_Account"));
            self.tf_Account.ignoreContentAdaptWithSize(true);
        }

        this.tf_Passwd = mainscene.node.getChildByTag(32);
        this.tf_Passwd.addEventListenerTextField(function(target, evt){
            localStorage.setItem("tf_Passwd", target.getString());
        },this.tf_Passwd);
        var cb_save_pw = mainscene.node.getChildByTag(17);
        cb_save_pw.addEventListenerCheckBox(function(state){
            localStorage.setItem("cb_save_pw", state.getSelectedState());
        });

        cb_save_pw.setSelectedState(localStorage.getItem("cb_save_pw") == "true")
        if(cb_save_pw.getSelectedState()){
            //获取默认账号
            self.tf_Passwd.setString(localStorage.getItem("tf_Passwd"));
            self.tf_Passwd.ignoreContentAdaptWithSize(true);
        }else {
            //
            self.tf_Passwd.setString("");
            self.tf_Passwd.ignoreContentAdaptWithSize(true);
        }

        var bt_Login = mainscene.node.getChildByTag(25);
        bt_Login.addClickEventListener(function(sender){
            var account = self.tf_Account.getString();
            var password = self.tf_Passwd.getString();
            if (account.length < 6 || password.length < 6) {
                window.alert('account or password is too short')
            }
            else {
                localStorage.setItem("tf_Account", account);
                localStorage.setItem("tf_Passwd", password);
                api.connect("ws://127.0.0.1:7880");
            }
        });

        // var bt_Connect = mainscene.node.getChildByTag(4);
        // bt_Connect.addClickEventListener(function(sender){

        //     self.socket = new WebSocket("ws://127.0.0.1:7980");
        //     api.socket = self.socket;
        //     api.req_id = 0;
        //     self.socket.onopen = function(evt) {
        //         self.onopen(evt);
        //         clearInterval(self.timeId);
        //         self.timeId = setInterval(function (){api.APIPing()},1000);
        //     };
        //     self.socket.onmessage = function(evt) {
        //         self.onmessage(evt);
        //         self.lb_Name.setString("an message was fired");;
        //         self.lb_Name.ignoreContentAdaptWithSize(true);
        //     };
        //     self.socket.onerror = function(evt) {
        //         cc.log("Error was fired");
        //         self.lb_Name.setString("an error was fired");;
        //         self.lb_Name.ignoreContentAdaptWithSize(true);
        //     };
        //     self.socket.onclose = function(evt) {
        //         cc.log("_wsiError websocket instance closed.");
        //         clearInterval(self.timeId);
        //         self.lb_Name.setString("an close was fired");;
        //         self.lb_Name.ignoreContentAdaptWithSize(true);
        //     };
        //     ws = self.socket;
        // });
        
        // var bt_Close = mainscene.node.getChildByTag(6);
        // bt_Close.addClickEventListener(function(sender){
        //     clearInterval(self.timeId);
        //     self.socket.close();
        // });
        
        // var bt_Chat = mainscene.node.getChildByTag(10);
        // bt_Chat.addClickEventListener(function(sender){
        //     var buf = "Hello WebSocket中文,\0 I'm\0 a\0 binary\0 message\0.";
        //     var binary = self._stringConvertToArray(buf);
        //     api.APILogin(binary.buffer)
        // });

        return true;
    },
    onopen:function (evt) {
            cc.log("onopen was fired");
    },
    onmessage:function (evt) {
            cc.log("onmessage was fired");
    },
    _stringConvertToArray:function (strData) {
        if (!strData)
            return null;

        var arrData = new Uint16Array(strData.length);
        for (var i = 0; i < strData.length; i++) {
            arrData[i] = strData.charCodeAt(i);
        }
        return arrData;
    }
});


var LoginScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LoginLayer();
        this.addChild(layer);
    }
});