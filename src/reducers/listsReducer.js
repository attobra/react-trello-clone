import {CONSTANTS} from "../actions"

let listID = 2
let cardID = 6

// an array of list and each list has an array of cards
const initialState = [
    {
        title:"Last Episode",
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}`,
                text:"we created a static List and a static Card"
            },
            {
                id: `card-${1}`,
                text: "we used a mix of Material UI React and Styles components"
            }
        ]
    },
    {
        title:"second Episode",
        id: `list-${1}`,
        cards: [
            {
                id: `card-${2}`,
                text:"we create our first reducer"
            },
            {
                id: `card-${3}`,
                text: "we render many cards with static data"
            },
            {
                id: `card-${4}`,
                text: "we will also make some changes like Link tags and roboto fonts, icons"
            },
            {
                id: `card-${5}`,
                text: "we will add roboto fonts, icons"
            }
        ]
    }
]
//take the state, but if you dont get a state, then fall back to our initialState
const listsReducer = (state = initialState, action) => {
    switch (action.type){
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: `list-${listID}`
            }
            listID += 1
            return [...state, newList]

        case CONSTANTS.ADD_CARD:
            {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            }
            cardID += 1

            const newState = state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list
                }
            })
            return newState
        }

            case CONSTANTS.DRAG_HAPPENED:
                const { 
                    droppableIdStart,
                    droppableIdEnd,
                    droppableIndexEnd,
                    droppableIndexStart,
                    draggableId,
                    type
                } = action.payload

                const newState= [...state]

                //dragging lists around
                if (type === "list") {
                    const list = newState.splice(droppableIndexStart, 1)
                    newState.splice(droppableIndexEnd, 0, ...list)
                    return newState
                }

                
                //drag and drop in the same list
                if (droppableIdStart === droppableIdEnd){
                    const list = state.find(list => droppableIdStart === list.id )
                    const card = list.cards.splice(droppableIndexStart, 1)
                    list.cards.splice(droppableIndexEnd, 0, ...card)
                }

                //other list
                if (droppableIdStart !== droppableIdEnd) {
                    //find the list where drag happened
                    const listStart = state.find(list => droppableIdStart === list.id);
                    //pull out the card from the list
                    const card = listStart.cards.splice(droppableIndexStart, 1);
                    //find list where drag ended
                    const listEnd = state.find(list => droppableIdEnd === list.id);
                    //put card in new list
                    listEnd.cards.splice(droppableIndexEnd, 0, ...card)
                  }

                return newState

        default: 
        return state
    }
}

export default listsReducer