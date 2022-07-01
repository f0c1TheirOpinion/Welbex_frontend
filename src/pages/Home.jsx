import React, {useState, useEffect} from 'react'
import {SortBlock, TableBlock} from "../components";
import axios from "axios";


const sortItemsRow = [

    {
        name:'Укажите значение',
        type: 'undf'
    },
    {
    name:'Название',
    type: 'Name'
},
    {
        name:'Количество',
        type:'amount'
    },
    {
        name:'Дистанция',
        type: 'distance'
    }
];

const sortItemsElq = [
    {
        name:'Укажите значение',
        type: 'undf'
    },
    {
        name:'Равно',
        type:'='
    },
    {
        name:'Содержит',
        type: 'LIKE'
    }
    ,
    {
        name:'Больше',
        type: '>'
    }
    ,
    {
        name:'Меньше',
        type: '<'
    }
];





function Home(props) {
const [table, setTable] = useState([]);
const activeTypes = (index) => {
    setTable(index);
}

    useEffect(() => {
        axios.get(`http://localhost:8080/`).then(({data}) => {

            setTable(data.rows);
        });
    }, [])






    return (
        <>
            <SortBlock sortItemsRow={sortItemsRow} sortItemsElq = {sortItemsElq} activeTypes={activeTypes} />
            {
                <TableBlock table={table ? table : []}/>
            }
        </>


    )
}

export default Home