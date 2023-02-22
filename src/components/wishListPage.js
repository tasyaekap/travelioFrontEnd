import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const UserList = () => {
    const [columns, setColumn] = useState([]);

    function array_chunks(array, chunks) {
        let result = [];
        let n = array.length;
        for (let i = 0; i < n; i += chunks) {
            result = [...result, array.slice(i, i + chunks)];
        }
        console.log(result)
        return result;
    }

      useEffect(() => {
        async function getBooks() {
            const response = await axios.get("http://localhost:3001/api/book/");
            setColumn(array_chunks(response.data.data, 3))
        }
        getBooks()
      }, []);

    const addToWishList = async (book) => {
        console.log(book)
    }

    return (
        <div className="columns mt-12">
            <div className="column is-full">
                {columns.map(function (items, key) {
                    return (
                        <div className="columns is-full">
                            {items.map((book) => (
                                <p class="mt-4 mr-4 mb-10">
                                    <div class="card" style={{ width: "450px" }}>
                                        <div class="card-image">
                                            <figure class="image is-4by3">
                                                <img src={book.image} alt="Placeholder" />
                                            </figure>
                                        </div>
                                        <div class="card-content">
                                            <div class="media">
                                                <div class="media-left">
                                                    <figure class="image is-60x60">
                                                        <button type="submit" onClick={() => addToWishList(book)} className="button is-success">
                                                            +
                                                        </button>
                                                    </figure>
                                                </div>
                                                <div class="media-content">
                                                    <p class="title is-5">{book.title}</p>
                                                    <p class="subtitle is-6">{book.authors}</p>
                                                    <span class="icon-text">
                                                        <span class="icon">
                                                            <FontAwesomeIcon icon={faStar} />
                                                            <FontAwesomeIcon icon={faStar} />
                                                            <FontAwesomeIcon icon={faStar} />
                                                            <FontAwesomeIcon icon={faStar} />
                                                            <FontAwesomeIcon icon={faStar} />
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="content" style={{ height: "90px" }}>
                                                {book.description}
                                                <br></br>
                                                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                                            </div>
                                        </div>
                                    </div>
                                </p>
                            ))}
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default UserList;