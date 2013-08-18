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
({
     require: ["com", "theme", "chat", "util", "commands", "text"],

     loadModule: function ()
     {
         this.commands.registerCommand("help", this);
         this.topics = new Object;
     },

     topics: null,

     help:
     {
         perm: function (src)
         {
             return true;
         },
         code: function (src, cmd, chan)
         {
             var topic = String(cmd.input).toLowerCase();

             if (cmd.input == "" || !cmd.input)
             {
                 this.com.message(src, "Please enter (/help <topic>), example topics: commands, script, source, administration, <command name>.", this.theme.INFO);
                 return;
             }

             if (topic.match(/commands?/))
             {

                 this.com.message(
                     src,

                     "Commands can be used similar to optargs style, for example: " +
                         "<b><font color=grey>/</font><font color=blue>command</font> <font color=red>\"</font><font color=teal>name of player</font><font color=red>\"</font> "+
                         "<font color=green>--</font><font color=orange>reason</font><font color=purple>=</font>"+
                         "<font color=red>\"</font><font color=gold>reason goes here</font><font color=red>\"</font></b><br/>" +
                         "The grey <b>/</b> is the slash used to indicate you are typing a command.<br/>"+
                         "The blue <b>command</b> is the name of the command to use.<br/>"+
                         "The red <b>\"</b> are quotation marks, these show where a parameter begins and ends.<br/>"+
                         "The teal <b>name of player</b> is a standard parameter.<br/>"+
                         "The green <b>--</b> indicates the start of a <i>named flag</i>.<br/>"+
                         "The orange <b>reason</b> is the name of a named flag.<br/>"+
                         "The purple <b>=</b> is an assignment, associating a named flag with a parameter.<br/>"+
                         "The gold <b>reason goes here</b> is a parameter to the --reason named flag.<br/>"
                     ,

                     this.theme.INFO, true
                 );

                 this.com.message([src], "Type /cmdlist for a list of commands, include the --all option to list all commands.", this.theme.INFO, true);

                 return;
             }

             else if (topic.match(/scripts?|sources?(?:code)?|licenses?|a?gpl/i))
             {
                 this.com.message(
                     src,

                    "<hr/><b>" + this.text.escapeHTML(
                         [
                             "Scripts Copyright (C) 2013  Ryan P. Nicholl, aka \"ArchZombie\" / \"ArchZombie0x\", <archzombielord@gmail.com>",

                             "This program is free software: you can redistribute it and/or modify",
                             "it under the terms of the GNU Affero General Public License as",
                             "published by the Free Software Foundation, either version 3 of the",
                             "License, or (at your option) any later version.",
                             "",
                             "This program is distributed in the hope that it will be useful,",
                             "but WITHOUT ANY WARRANTY; without even the implied warranty of",
                             "MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.",
                             "See the GNU Affero General Public License for more details.",
                             "",
                             "You should have received a copy of the GNU Affero General Public License",
                             "along with this program.  If not, see <http://www.gnu.org/licenses/>."
                         ].join("\n")) + "</b><hr/>" +

                     "Source code may be available at <a href='https://github.com/ArchZombie/zscripts'>https://github.com/ArchZombie/zscripts</a>, or in the following .ZIP file: " +
                         "<a href='https://github.com/ArchZombie/zscripts/archive/master.zip'>https://github.com/ArchZombie/zscripts/archive/master.zip</a>.<br/><br/>" +
                         "If the source code is modified but this license notice is not updated, you may be able to get the source using /getsource.<br/>"+
                         "Report license violations to <a href='mailto:archzombielord@gmail.com'>&lt;archzombielord@gmail.com&gt;</a>.<hr/>" +

                         "Using ZScript Framework v" + (this.script.version ? this.script.version : "BETA-1.0.0"),

                     this.theme.INFO, // theme

                     true // html

                 );
             }

             else if (topic in this.commands.commands_db)
             {

                 var canuse = (src == 0? this.commands.commands_db[topic].server : sys.auth(src) == 3 || this.commands.commands_db[topic].perm.apply(this.commands.commands_db[topic].bind, [src]));

                 var str = "<b>Command " + this.commands.commands_db[topic].name + ":</b><br/>" +
                     "<b>Permission:</b> " +(canuse?"yes":"<font color=red><b>no</b></font>")+"<br/>"+
                     "<b>Description:</b> " + (this.commands.commands_db[topic].desc?" "+this.commands.commands_db[topic].desc:"n/a")+"<br/>"+
                     "<b>Options:</b> ";

                 if (this.commands.commands_db[topic].options)
                 {
                     var options = this.commands.commands_db[topic].options;

                     for (var x2 in options)
                     {
                         str += ("<br/>&nbsp;&nbsp;&nbsp;&nbsp;--" + this.text.escapeHTML(x2) + "&nbsp;&nbsp;&nbsp;&nbsp;" + this.text.escapeHTML(options[x2]));
                     }
                 }
                 else
                 {
                     str += "<i>none</i>";
                 }

                 this.com.message(src, str, this.theme.INFO, true);
             }

         }
     },

     /** Unused
      * @deprecated
      */
     helper_capturer: function (src, msg, chan)
     {
         var emsg = msg.replace(/[\s\.\,\?\!]/g, "");
         if (emsg === "exit") return;

         if (emsg === "1")
         {
             this.com.message(
                 [src]
                 ,
                 "Commands can be used similar to optargs style, for example: " +
                     "<b><font color=grey>/</font><font color=blue>command</font> <font color=red>\"</font><font color=teal>name of player</font><font color=red>\"</font> "+
                     "<font color=green>--</font><font color=orange>reason</font><font color=purple>=</font>"+
                     "<font color=red>\"</font><font color=gold>reason goes here</font><font color=red>\"</font></b><br/>" +
                     "The grey <b>/</b> is the slash used to indicate you are typing a command.<br/>"+
                     "The blue <b>command</b> is the name of the command to use.<br/>"+
                     "The red <b>\"</b> are quotation marks, these show where a parameter begins and ends.<br/>"+
                     "The teal <b>name of player</b> is a standard parameter.<br/>"+
                     "The green <b>--</b> indicates the start of a <i>named flag</i>.<br/>"+
                     "The orange <b>reason</b> is the name of a named flag.<br/>"+
                     "The purple <b>=</b> is an assignment, associating a named flag with a parameter.<br/>"+
                     "The gold <b>reason goes here</b> is a parameter to the --reason named flag.<br/>"
                 ,
                 this.theme.INFO, true
             );

             this.com.message([src], "Type /cmdlist for a list of commands, include the --all option to list all commands.", this.theme.INFO, true);
             this.com.message([src], "What do you need help with?<br/>Using commands, type 1.<br/>Contacting server admins, type 2.<br/>Getting source code, type 3.<br/>Anything else, type 4.<br/>To cancel this and go back to the chat, type exit.</span>", this.theme.INFO, true);
             this.chat.registerCapture(src, "helper_capturer", this);
             return;
         }

         else if (emsg === "2")
         {
             this.com.message([src], "Admins have special pokeballs, look for great ball or higher!", this.theme.info);
             this.com.message([src], "What do you need help with?<br/>Using commands, type 1.<br/>Contacting server admins, type 2.<br/>Getting source code, type 3.<br/>Anything else, type 4.<br/>To cancel this and go back to the chat, type exit.</span>", this.theme.INFO, true);
             this.chat.registerCapture(src, "helper_capturer", this);
             return;
         }

         else if (emsg === "3")
         {
             this.script.AGPL(src, msg, chan);
             this.com.message([src], "What do you need help with?<br/>Using commands, type 1.<br/>Contacting server admins, type 2.<br/>Getting source code, type 3.<br/>Anything else, type 4.<br/>To cancel this and go back to the chat, type exit.</span>", this.theme.INFO, true);
             this.chat.registerCapture(src, "helper_capturer", this);
             return;
         }

         else if (emsg === "4")
         {
             this.com.message([src], "Go ask someone in the chat!", this.theme.INFO);
             return;
         }

         this.com.message([src], "Command not understood.", this.theme.INFO);
         this.com.message([src], "What do you need help with?<br/>Using commands, type 1.<br/>Contacting server admins, type 2.<br/>Getting source code, type 3.<br/>Anything else, type 4.<br/>To cancel this and go back to the chat, type exit.</span>", this.theme.INFO, true);
         this.chat.registerCapture(src, "helper_capturer", this);
     }
 });
