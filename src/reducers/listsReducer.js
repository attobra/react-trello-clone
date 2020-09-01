import {CONSTANTS} from "../actions"

let listID = 2
let cardID = 4

// an array of list and each list has an array of cards
const initialState = [
    {
        title:"Last Episode",
        id: 0,
        cards: [
            {
                id: 0,
                text:"we created a static List and a static Card"
            },
            {
                id: 1,
                text: "we used a mix of Material UI React and Styles components"
            }
        ]
    },
    {
        title:"second Episode",
        id: 1,
        cards: [
            {
                id: 0,
                text:"we creare our first reducer"
            },
            {
                id: 1,
                text: "we render many cards with static data"
            },
            {
                id: 2,
                text: "we will also make some changes like Link tags and roboto fonts, icons"
            }
        ]
    },
    {
        title:"second Episode",
        id: 3,
        cards: [
            {
                id: 0,
                text:"we creare our first reducer"
            },
            {
                id: 1,
                text: "we render many cards with static data"
            },
            {
                id: 2,
                text: "we will also make some changes like Link tags and roboto fonts, icons"
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
                id: listID
            }
            listID += 1
            return [...state, newList]
        case CONSTANTS.ADD_CARD:
            const newCard = {
                text: action.payload.text,
                id: cardID
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

        default: 
        return state
    }
}

export default listsReducer