import React, {useEffect, useState} from 'react'
import axios from "axios";

const SortBlock = React.memo(function SortBlock ({sortItemsRow, sortItemsElq, activeTypes}) {


        const [toggleStateRow, setToggleStateRow] = useState(false);
        const [nameSortRow, setNameSortRow] = useState([sortItemsRow[0].name, sortItemsRow[0].type ])

    const [toggleStateElq, setToggleStateElq] = useState(false);
    const [nameSortElq, setNameSortElq] = useState([sortItemsElq[0].name, sortItemsElq[0].type]);

    const  [cur, setCur] = useState('');


        useEffect(() => {

            if(nameSortRow[1] !== "undf" && nameSortElq !== "undf" && cur !== '') {

                axios.post(`http://localhost:8080/filt`, {

                    "name": nameSortRow[1],
                    "elq": nameSortElq[1],
                    "cur": cur,

                }).then(({data}) => {

                    activeTypes(data.rows)
                });
            }
        }, [nameSortRow, nameSortElq, cur, activeTypes])

    const curChange = event =>{
        setCur(event.target.value)
}

    const updNameSortRow = (obj, index) => {
            console.log(obj);
            setToggleStateRow(false);
            setNameSortRow([obj.name, obj.type]);


        }
        const toggleRow = () => {
            setToggleStateRow(!toggleStateRow);
        }

    const updNameSortElq = (obj, index) => {
        console.log(obj);
        setToggleStateElq(false);
        setNameSortElq([obj.name, obj.type]);


    }
    const toggleElq = () => {
        setToggleStateElq(!toggleStateElq);
    }



    return (
            <div className="sort">
                <div className="sort__label">
                    <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#2C2C2C"
                        />
                    </svg>
                    <span onClick={() => toggleRow()}>{nameSortRow[0]}</span>
                </div>
                {toggleStateRow    &&
                    <div className="sort__popup">
                        <ul>
                            {sortItemsRow.map((obj, index) => (
                                <li className={obj.name === nameSortRow[0] ? 'activeSort' : ''} key={`${obj.name}_${index}`} onClick={() => updNameSortRow(obj, index)}>{obj.name}</li>
                            ) )}

                        </ul>
                    </div>

                }


                <div className="sort__label">
                    <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#2C2C2C"
                        />
                    </svg>
                    <span onClick={() => toggleElq()}>{nameSortElq[0]}</span>
                </div>
                {toggleStateElq    &&
                    <div className="sort__popup">
                        <ul>
                            {sortItemsElq.map((obj, index) => (
                                <li className={obj.name === nameSortElq[0] ? 'activeSort' : ''} key={`${obj.name}_${index}`} onClick={() => updNameSortElq(obj, index)}>{obj.name}</li>
                            ) )}

                        </ul>
                    </div>

                }

                <input
                    type="text"
                    onChange={curChange}
                    value={cur}
                    autoComplete="off"
                />
            </div>


        )
    }
)
export default SortBlock