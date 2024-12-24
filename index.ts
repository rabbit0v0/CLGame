import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let left = false;
let globalName = '';

const promptName = async () => {
    await sleep(1000);
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: chalk.bgBlue('What is youe name? \n'),
    });

    await sleep(1000);

    console.log(chalk.blue(`You remember your name is ${name}. But what is this room? Why are you here? You try to think hard but nothing come into your mind. \n`));

    globalName = name;
};

const promptDirection = async () => {
    await sleep(800);
    const { direction } = await inquirer.prompt({
        type: 'list',
        name: 'direction',
        message: 'You decide to look:\n',
        choices: ['Up', 'Down', 'Left', 'Right', 'Forward']
    });

    await sleep(1000);

    switch (direction) {
        case 'Up':
            console.log(chalk.blue("You see a star-shaped light on the ceiling. The mild light brings you a sense of peace.\n"));
            await promptDirection();
            break;
        case 'Down':
            console.log(chalk.blue("You see yourself wearing silk pajamas, soft and comfortable. A pair of furry slippers are on your feet. The details of the wooden floor is unclear under the dim lights.\n"));
            await promptDirection();
            break;
        case 'Left':
            console.log(chalk.blue("Your bed lies there, the duvet is in a mess, but you don't feel like making the bed.\n"));
            await promptDirection();
            break;
        case 'Right':
            console.log(chalk.blue("A Christmas tree stands there, right by a window, shining with ") + chalk.bgGreen('green') + " " + chalk.bgYellow('yellow') + chalk.blue(",  and ") + chalk.bgRed('red') + chalk.blue(" lights. The window is covered by a thick curtain. You can't see anything outside.\n"));
            await roomRightAction();
            await promptDirection();
            break;
        case 'Forward':
            console.log(chalk.blue('There is a firplace on the other end of the room. The crackling fire casts a soft, flickering glow that dances on the walls. A rocking chair is in front of the firplace, waiting for someone to sit there and enjoy the warmth from the fire. You can also see the shape of the door next to the fireplace.\n'));
            await roomForwardAction();
            if (!left) {
                await promptDirection();
            }
            break;
        default:
            break;
    }
};

const roomRightAction = async () => {
    await sleep(1000);
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What do you want to do?\n',
        choices: ['Open the curtain', 'Look at the Christmas tree', 'Nothing']
    });
    
    await sleep(1000);

    switch (action) { 
        case 'Open the curtain':
            console.log(chalk.blue('You open the curtain. You see sea and snow-covered mountains shrouded in moonlight.\n'));
            await sleep(1000);
            console.log(chalk.blue('The snow on the roof of wooden shed is at least twenty centimeters thick, however you feel warm indoor.\n'));
            await roomRightAction();
            break;
        case 'Look at the Christmas tree':
            console.log(chalk.blue('You look at the Christmas tree. There are some cute decorations! A unicorn, a cyan dragon, some flowers and ... something just jumped off the tree and fled...\n'));
            await sleep(1500);
            console.log(chalk.blue('You don\'t know how but it just come to your mind that it\'s a golden hamster.\n'));
            await sleep(500);
            await roomRightAction();
            break;
        default:
            break;
    }
};
 
const roomForwardAction = async () => { 
    await sleep(1000);
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What do you want to do?\n',
        choices: ['Sit on the chair', 'Leave the room', 'Nothing']
    });

    
    await sleep(1000);

    switch (action) {
        case 'Sit on the chair':
            console.log(chalk.blue('You walk to the rocking chair and sit down. Your face is brightened by the fire. You reach out your hands and feel the heat, it gives you a nostalgic feeling.\n'));
            await sleep(1500);
            console.log(chalk.blue('Some images flash through your mind... The icy hold on the lake, the sauna in woodshed, the jumping candle light, the heavy firwood, the reindeers on the road, the northen lights...\n'));
            await sleep(2000);
            console.log(chalk.blue('You take a deep breath and shake those thoughts out of your mind.\n'));
            await roomForwardAction();
            break;
        case 'Leave the room':
            left = true;
            console.log(chalk.blue('As you stepping towards the door, the soft murmur of voice and laughter leak through the door. You pull the door open.\n'));
            await sleep(1000);
            console.log(chalk.blue("You see a room full of friends, they are all smiling and talking. When you step in, they all turn to you and shout: \n"));
            await sleep(1500);
            figlet(`Merry Christmas, ${globalName.toUpperCase()}!`, 'Reverse', (_, data) => {
                console.log(data)
             });
            break;
        default:
            break;
    }
};

const story = async () => {
    console.log(chalk.blue('It\'s quiet out side. You wake up in a warm, soft bed. You feel a bit lost. You try to remember your name. \n'));

    await promptName();

    await sleep(1000);
    console.log(chalk.blue('You get up and look around the room. \n'));
    await sleep(1000);

    await promptDirection();

}

await story();
