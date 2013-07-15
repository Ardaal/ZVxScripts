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
/** An rpg battle descriptor. Note the format is subject to change.
 * @name rpgBattle
 * @class
 */
/** The players in the battle. Note this is an array of player /names/ not objects. This is done so as not to have duiplicates of player objects in the database.
 * @name players
 * @type {Array.<String>}
 * @memberOf rpgBattle.prototype
 */
/** The mobs in the battle.
 * @name mobs
 * @type {Array.<rpgMob>}
 * @memberOf rpgBattle.prototype
 */
/** @scope script.modules.rpg_game */
({
    /** Battle step will cause a turn in a battle to take place
     * @event
     * @param {rpgCtx} ctx
     * @param {rpgBattle} ctx.battleid The id of the specific battle this should step.
     * @param {rpgClass} ctx.rpg The current rpg we are in.
     */
    battleStep: function (ctx)
    {
        var rpg = ctx.rpg;
        var id = ctx.battleid;

        var battle = rpg.battles[id];

        // team_players is an array of all the players that are playing
        // we make it from battle.players
        var team_players = [];
        for (var x in battle.players)
        {
            team_players.push(this.players[battle.players[x]]);
            // Battle players contains NAMES of players, not the player objects!
        }

        var team_mobs = []; // Do not save!
        for (var x in battle.mobs)
        {
            team_mobs.push(battle.mobs[x]);
        }

        var entities = []; // Do not save!


        for (var x in team_players)
        {
            entities.push({type: "player", e: team_players[x]});
        }

        for (var x in team_players)
        {
            entities.push({type: "mob", e: team_mobs[x]});
        }

        entities.sort(
            function _sorting_function_ (a, b)
            {
                return a.speed - b.speed;
            }
        );

        battleLoop: for (var x in entities)
        {
            var attacker = ctx.attacker = entities[x].e;
            //ctx.attackerIsPlayer = entities[x].type == "player";
            var move = ctx.move = this.pickMove(entities[x]);

            if (ctx.move.cost) for (var x2 in ctx.move.cost)
            {
                if (ctx.attacker[(x2 === "mp"? "mana" : x)] -= ctx.move.cost[x2] < 0)
                {
                    ctx.out(ctx.attacker.name + " tried to use "  + ctx.move.name + " but didn't have enough " + this.longStatName[x2 === "mp" ? "mana" : "mp"]);
                    continue battleLoop;
                }
            }

            for (var x2 in ctx.move.components)
            {
                var cmp = ctx.move.components[x2];
                var targets = ctx.targets = [];
                var count = cmp.count;
                switch (typeof cmp.target)
                {
                case "object":
                    // Array
                    if (cmp.target.indexOf("ally") != -1) ctx.targets = ctx.targets.concat(team_players);
                    if (cmp.target.indexOf("opp") != -1) ctx.targets = ctx.targets.concat(team_mobs);
                    if (cmp.target.indexOf("self") != -1 && ctx.indexOf(ctx.attacker) == -1) ctx.targets.push(ctx.attacker);
                    break;
                case "string":
                    switch (ctx.move.type)
                    {
                        case "ally": ctx.targets = team_players;
                        case "self": ctx.targets = [attacker];
                    }
                }

                this.util.shuffle(targets);

                if (count !== 0) for (var x3 in targets)
                {
                    if (count-- === 0) break;
                }
            }

            this.moves[ctx.move.type]
        }

    }

});
