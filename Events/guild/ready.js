const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`🟢 | Ready! Logged in as ${client.user.tag}`);

        // تعيين حالة البوت إلى idle
        await client.user.setStatus('idle');

        // تعيين الحالة الكستوم بشكل فوري
        await client.user.setPresence({
            activities: [{ name: '💠 Hero On Top', type: 'WATCHING' }],
            status: 'idle'
        });

        // تسجيل النشاطات بشكل دوري
        const activities = ['💠 Hero On Top'];
        setInterval(() => {
            const activity = activities[Math.floor(Math.random() * activities.length)];
            client.user.setActivity(activity, { type: 'WATCHING' });
            client.user.setStatus('idle'); // تعيين الحالة إلى idle
        }, 10000); // تغيير النشاط كل 10 ثوانٍ
    },
};
