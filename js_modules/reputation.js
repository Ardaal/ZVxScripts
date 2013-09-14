/*  ///////////////////////// LEGAL NOTICE ///////////////////////////////

This file is part of ZVxScripts,
a modular script framework for Pokemon Online server scripting.

Copyright (C) 2013  Ryan P. Nicholl, aka "ArchZombie" / "ArchZombie0x", <archzombielord@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

/////////////////////// END LEGAL NOTICE /////////////////////////////// */
({
    
    require: ["io", "profile"]
    ,
    database: null
    ,
    times: new Object
    ,
    loadModule: function ()
    {
        this.database = this.io.openDB("reputation");

        if (!this.database.users) this.database.users = new Object;
        
        this.script.registerHandler("afterLogIn", this);
        this.script.registerHandler("beforeLogOut", this);

        var u = sys.playerIds();

        for (var x in u)
        {
            this.afterLogIn(u[x]);
        }
    }
    ,
    unloadModule: function()
    {
        var u = sys.playerIds();

        for (var x in u)
        {
            this.beforeLogOut(u[x]);
        }

        this.io.closeDB("reputation");
    }
    ,
    updateReputation: function (src)
    {
        var now = +new Date;
        var p = sys.name(src).toLowerCase();
        
        if (!this.database.users[p]) this.database.users[p] = 0;
        
        if (!this.times[p]) this.times[p] = now;
        else 
        {           
            var diff = now - this.times[p];
            var minutes =  ~~(diff / 1000 / 60);
            this.database.users[p] += minutes;
            
            this.times[p] = now;
            this.io.markDB("reputation");
        }
    }
    ,
    reputationOf: function (src)
    {
        return this.database.users[sys.name(src).toLowerCase()] || 0;        
    }
    ,
    afterLogIn: function (src)
    {
        this.updateReputation(src);        
    }
    ,
    beforeLogOut: function (src)
    {
        var p = sys.name(src).toLowerCase();
        this.updateReputation(src);
        delete this.times[p];
    }
});


