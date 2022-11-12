const { Client, Intents, RoleManager, Guild, GuildMemberRoleManager } = require('discord.js');
const { token, CLIENT_ID, GUILD_ID } = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
	{
		name: 'join',
		description: 'Entra al server con el rol'
	}
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	let user = interaction.member;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
	if (interaction.commandName === 'join') {
		let role = interaction.guild.roles.cache.find(role => role.name === "Zorrit@");
		if (user.roles.cache.has(role.id)) {
			await interaction.reply(`Tu ya tienes el rol, ${user.displayName} >:(`);
		} else {
			interaction.reply(`Ahora puedes acceder a los canales, ${user.displayName}`);
			user.roles.add(role);
		  }
	}
});

client.login(token);