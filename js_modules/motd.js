({ // starts module
    require: ["commands", "com", "io"],
    loadModule: // rules.loadModule
    function ()
    {
        this.commands.registerCommand("motd", this);
        this.io.registerConfig(this, { message: "", sendMOTDOnLogin: false });
        this.script.registerHandler("afterLogIn", this);
    },
    motd:
    {
        category: "basic",
        desc: "Shows the server's MOTD",
        perm: function ()
        {
            return true; // all users shoudl be able to use /motd so don't check anything
        },
        code: function (src, cmd, chan) // code that runs /motd
        {
             this.com.message(src, "MOTD: " + this.config.message);
        }
    },
    afterLogIn: function (src)
    {
        if (this.config.sendMOTDOnLogin )
        {
            this.com.message(src,"MOTD: " + this.config.message);
        }
    }
});
