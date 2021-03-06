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
     require: ["commands", "com", "theme", "user", "text"],

     kick:
     {
         category: "security",
         server: true,

         desc: "Kicks user(s) off the server",

         options:
         {
             "force": "Kicks users normally immune to kick.",

             silent: "Does not display a message.",

             "reason": "Reason for the kick."
         },


         perm: "KICK",

         code: function (src, cmd)
         {
             var kicklist = [];
             var groups = this.user.groups(src);
             var kicknameslist = [];
             var sys_auth$src = (src == 0 ? 3 : sys.auth(src));

             if (cmd.flags.force && !this.user.hasPerm(src, "OVERRIDE"))
             {
                 this.com.message(src, "Force option: Permission denied.", this.theme.WARN);
                 cmd.flags.force = false;
             }

             if (cmd.flags.silent && !this.user.hasPerm(src, "SILENT"))
             {
                 this.com.message(src, "Silent option: Permission denied.", this.theme.WARN);
                 cmd.flags.silent = false;
             }

             for (var x in cmd.args)
             {
                 var i = sys.id(cmd.args[x]);



                 if (!i)
                 {
                     this.com.message([src], "Cant find user: " + cmd.args[x], this.theme.WARN);
                     continue;
                 }

                 if (this.user.hasPerm(i, "PROTECTED") && !cmd.flags.force)
                 {
                     this.com.message([src], "User is immune to kick.", this.theme.WARN);
                     continue;
                 }

                 kicklist.push(i);
                 kicknameslist.push(cmd.args[x]);

             }

             if (kicklist.length == 0) return;



             if (!cmd.flags.silent)
             {
                 this.com.broadcast(this.user.name(src) + " kicked " + kicknameslist.join(", ") + "!" +
                                    (cmd.flags.reason ? " (Reason: " + cmd.flags.reason + ")" : String() ), this.theme.CRITICAL);
             }

             for (x in kicklist)
             {
                 sys.kick(kicklist[x]);
             }
         }
     }
     ,
     loadModule: function ()
     {
         this.commands.registerCommand("kick", this);
     }
 });
