import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const UserList = () => {
    const [books, setBook] = useState([]);
    const [columns, setColumn] = useState([]);
    const navigate = useNavigate();
    const [selected, setSelected] = useState({})

    //   useEffect(() => {
    //     getBooks();
    //   }, []);

    //   const getBooks = async () => {
    //     const response = await axios.get("http://localhost:3001/api/book/");
    //     setBook(response.data.data);
    //   };

    function array_chunks(array, chunks) {
        let result = [];
        let n = array.length;
        for (let i = 0; i < n; i += chunks) {
            result = [...result, array.slice(i, i + chunks)];
        }
        console.log(result)
        return result;
    }

    const addToWishList = async (book) => {
        try{
            await axios.post("http://localhost:3001/api/book/", {
                'title': book.volumeInfo.title,
                'description': book.volumeInfo.description,
                'authors': book.volumeInfo.authors,
                'image': book.volumeInfo.imageLinks.thumbnail
            });
            navigate('wishlist')
        } catch(err){
            console.log(err)
        }
    }

    const searchBook = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3001/api/book/searchBooks", {
                'bookTitle': e.target.value
            });

            setBook(res.data.data.items)
            setColumn(array_chunks(res.data.data.items, 3))
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns mt-12">
            <div className="column is-full">
                <p class="mt-4">
                    <div class="field">
                        <input
                            class="input"
                            onBlur={(e) => searchBook(e)}
                            type="search"
                            placeholder="Search..." />
                    </div>
                </p>
                {columns.map(function (items, key) {
                    return (
                        <div className="columns is-full">
                            {items.map((book) => (
                                <p class="mt-4 mr-4 mb-10">
                                    <div class="card" style={{ width: "450px" }}>
                                        <div class="card-image">
                                            <figure class="image is-4by3">
                                                <img src={book.volumeInfo.imageLinks.thumbnail} alt="Placeholder" />
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
                                                    <p class="title is-5">{book.volumeInfo.title}</p>
                                                    <p class="subtitle is-6">{book.volumeInfo.authors}</p>
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
                                                {book.volumeInfo.description}
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