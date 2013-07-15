/*  ///////////////////////// LEGAL NOTICE ///////////////////////////////

This file is part of ZScripts,
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
/*
({
    require: ["profile"]
    ,
    parseArgs: function (args)
    {
    var retval = {
        profs: []
        ,
        uids: []
    };

    for (var x in args)
    {
        if (args[x].length == 0) continue;

        if (args[x][0] == ":")
        {
            var m = args[x].match(/^\?(\w+):(.+)$/);
            
            if (!m) continue;
            
            if (m[1] == "prof")
            {
                if ( m[2] in this.profile.database.profiles)
                {
                        profs.push (m[2]);
                }
            }
        }
        return retval;
    }
});
*/
