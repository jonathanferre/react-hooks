import React, {useState, useEffect, useReducer, useMemo, useRef } from 'react'

const initialState = {
    favorites: []
}

const favoriteReducer = (state, action) => {
    switch(action.type){
        case 'ADD_TO_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        default:
            return state;
    }
}

const Characters = () => {

    const [characters, setCharacters] = useState([]);
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const [search, setSearch] = useState('');
    const searchInput = useRef(null);


    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/')
            .then(res => res.json())
            .then(data => setCharacters(data.results)) //results api
    }, [])

    const handleClick = favorite => {
        dispatch({type : 'ADD_TO_FAVORITE', payload: favorite})
    }

    const handleSearch = () => {
        setSearch(searchInput.current.value);
    }

    // const filteredUser = characters.filter((user) => {
    //     return user.name.toLowerCase().includes(search.toLowerCase());
    // })

    const filteredUser = useMemo(() => 
        characters.filter((user) => {
         return user.name.toLowerCase().includes(search.toLowerCase());
        }),
        [characters, search]
    )

    return (
        <div className="Characters">

            {favorites.favorites.map(favorite => (
                <li key={favorite.id}>{favorite.name}</li>
                ))
            }

            <div className="search">
                <input 
                    type="text" 
                    value={search} 
                    onChange={handleSearch}
                    ref={searchInput} />
            </div>

            {filteredUser.map(character => (
                <div className="item">
                    <h2>{character.name}</h2>
                    <button 
                        type="button" 
                        onClick={() => handleClick(character)}>
                        Add favorites
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Characters
