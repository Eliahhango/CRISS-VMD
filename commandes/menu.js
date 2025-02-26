const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "menu", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    let coms = {};
    let mode = "public";

    if ((s.MODE).toLowerCase() !== "yes") {
        mode = "private";
    }

    cm.map((com) => {
        if (!coms[com.categorie]) {
            coms[com.categorie] = [];
        }
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
╭━━✧ *𝗖𝗥𝗜𝗦𝗦-𝗩𝗘𝗩𝗢✧━━❖*
┊✺┌────••••────⊷
┃✇│◎ 𝙾𝚠𝚗𝚎𝚛 : ${s.OWNER_NAME}
┃✇│◎ 𝙿𝚛𝚎𝚏𝚒𝚡 : [ ${s.PREFIXE} ]
┃✇│◎ 𝙼𝚘𝚍𝚎 : ${mode}
┃✇│◎ 𝚁𝚊𝚖  : 8/132 GB
┃✇│◎ 𝙳𝚊𝚝𝚎  : ${date}
┃✇│◎ 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : ${os.platform()}
┃✇│◎ 𝙲𝚛𝚎𝚊𝚝𝚘𝚛 : Tinmasa 
┃✇│◎ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 : ${cm.length}
┃✇│ 𝚃𝚑𝚎𝚖𝚎 : JB
┊   └────••••────⊷
╰━━━••✧𝗖𝗥𝗜𝗦𝗦-𝗩𝗘𝗩𝗢✧••━━━◆ \n`;


🌇Good evening! time to relax

╰━━━••➤•••${readmore}

    let menuMsg = `𝗖𝗥𝗜𝗦𝗦 𝗩𝗘𝗩𝗢 𝗖𝗠𝗗`;
    
    for (const cat in coms) {
        menuMsg += `
╭━━━❂ *${cat}* ❂⁠⁠⁠⁠━━─••
║╭━━══••══━━••⊷ `;
        for (const cmd of coms[cat]) {
            menuMsg += `          
║┊◆ ${s.PREFIXE}  ${cmd}`;    
        }
        menuMsg += `
║╰━━══••══━━••⊷
╰════────════◆◆◆`;
    }
    
    menuMsg += `
> @𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗖𝗥𝗜𝗦𝗦 𝗩𝗘𝗩𝗢 𝗖𝗠𝗗\n`;

    try {
        const senderName = nomAuteurMessage || message.from;  // Use correct variable for sender name
        await zk.sendMessage(dest, {
            text: infoMsg + menuMsg,
            contextInfo: {
                mentionedJid: [senderName],
                externalAdReply: {
                    title: "𝗖𝗥𝗜𝗦𝗦 𝗩𝗘𝗩𝗢 𝗖𝗠𝗗",
                    body: "Tap here my friend join channel update",
                    thumbnailUrl: "https://files.catbox.moe/xro4ka.jpeg",
                    sourceUrl: "https://whatsapp.com/channel/0029VarYP5iAInPtfQ8fRb2T",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("Menu error: ", error);
        repondre("🥵🥵 Menu error: " + error);
    }
});
