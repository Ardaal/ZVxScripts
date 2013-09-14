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
/** @scope script.modules.rpg_game */
({
    /**
     * @namespace
     */
    moves:
    {
        /** Instakill kills all enemies instantly, no damage calculation
         * @param {rpgContext} ctx
         */
        instakill: function (ctx)
        {
            for (var x in targets)
            {
                targets[x].hp = 0;
            }
        }
        ,
        /** Physical does physical damage
         * @param {rpgContext} ctx
         */
        physical: function (ctx)
        {
            var offense = ctx.attacker.offense;
            var base = ctx.component.base;

            var defense = target.defense;

            var damage = base + base * Math.min(Math.max(-0.90, Math.log(offense/defense)), 9);

            target.hp -= damage | 0;
            }
        }
        ,
        /** Heal reverses damage.
         * @param {rpgContext} ctx
         */
        heal: function (ctx)
        {
            var base = ctx.movepower;

            for (var x in targets)
            {


             }
        }
    }
    ,
    pickMove: function (e)
    {
        return {
            name: "attack",
            components:[{ target: "opp", base:20, move: "physical", desc: "%s attacked %t!"}]
        };

        var plan = e.plan;

        var list = plan.list;
        var total = plan.total;
        var idx = Math.floor(Math.random()*(plan.total));
        for (var i = 0; list[i].pri <= idx; i++, idx -= list[i].pri) {}

        return list[i];
     }
});
