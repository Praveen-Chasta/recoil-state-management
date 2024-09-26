import {atom} from 'recoil'

export const challengesState = atom({
    key : 'challengesState',
    default : []
})

export const filterState = atom({
    key : 'filterState',
    default : {
        status : [] ,
        levels : [] ,
        searchTerms : ''
    }
})