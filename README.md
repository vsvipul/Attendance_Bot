# Attendance_Bot
Helps in marking your hostel attendance by assigning one person in the hostel to mark everybody's attendance everyday. Saves time and human work.

## How to get started?
- Create a new file ```key.js``` with a similar format as below - 
    ```
        module.exports = {
            floorList: ["PersonName1", "PersonName2", "PersonName3"],
            token: "YOUR_TELEGRAM_BOT_TOKEN"
        }
    ```
- Run ```npm install``` and then ```node index.js``` to start the bot.
- Send an initial message by adding the bot in a group to initialize the bot. Sit and back and relax. The bot will remind who has to mark the attendance each day at exactly 9 PM. If you wish to change the time, change the hours in index.js file.