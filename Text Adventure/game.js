const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'After a storm decimated your entire village, you and the three other survivors took all that you' +
        ' had left and began a journey to find your new home. After an hour of trekking through the forest, eight year-old Maura began' +
        ' to complain about her feet hurting. She always looked to you as an older sibling and often depended on you for help.' +
        ' You contemplated what you should do...',
        options: [
            {
                text: 'Pick up Maura and carry her on your back',
                //setState : {blueGoo: true},
                nextText: 2
            },
            {
                text: 'Tell Maura to stop complaining and be strong',
                nextText: 3
            },
            {
                text: 'Ignore and keep walking. You are in no mood for weakness.',
                nextText: 4
            }
        ]
    },
    {
        id: 2,
        text: 'Maura laughs with joy as you lift her up onto your back. You all continue walking for a few more hours until' +
        ' you notice the sun begin to set. You hear the others start murmuring about wanting to set up camp for the night.' +
        ' Will you:',
        options: [
            {
                text: 'Set up camp',
                //requiredState: (currentState) => currentState.blueGoo,
                //setState: {blueGoo: false, sword: true},
                nextText: 5
            },
            {
                text: 'Ignore the others and continue to walk through the night',
                nextText: 6
            }
        ]
    },
    {
        id: 3,
        text: 'Maura is saddened by your words but tries to ignore the pain in her feet.' +
        ' You see tears break out at the corner of her eyes. Reluctantly, you throw her onto your back.',
        options: [
            {
                text: 'Go on',
                nextText: 2
            }
        ]
    },
    {
        id: 4,
        text: 'Because of your cold hearted decision, you did not realize Maura was close to falling unconscious.' +
        ' Maura ended up passing out while walking near a cliffside and fell to her death! Angered by your decision,' +
        ' the rest of the group turned on you and threw you over, as well! \n\nYOU DIED',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 5
    },
    {
        id: 6,
        text: '\nBecause of your terrible decision, the whole group dies after a run in with a bear because they were all' +
        'too exhausted to escape it. The bear saves you for last. \nYOU DIED',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    }
]

startGame()