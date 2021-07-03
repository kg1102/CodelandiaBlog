
import { useHistory } from 'react-router-dom';
import '../assets/styles/App.scss';
import SearchImg from '../assets/images/search.svg';
import LikeImg from '../assets/images/like.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollReveal from 'scrollreveal';
import SyncLoader from "react-spinners/SyncLoader";



export default function App(){

    type newType = {
        title: string,
        shortdescription: string,
        publishdatestring: string
    }

    const [textSearch, setTextSearch] = useState('');
    const [news, setNews] = useState<newType[]>([]);
    const [loading, setLoading] = useState(true);

    let history = useHistory();

    function handleLikeButton(){
        alert('Voce deu laiker');
    }

    function handleReturnToHome(){
        history.push("/");
    }


    useEffect(()=>{
        axios.get('https://search.sbt.com.br/api/notices/?limit=100&orderby=publishdate&sort=desc', {
            headers: {
                "accept": "application/json, text/plain, */*",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpZ2l0YWwtc2J0IiwiZW5kcG9pbnRzIjpbIioiXSwiaG9zdHMiOlsiKiJdLCJzZXJ2aWNlcyI6WyIqIl0sImlhdCI6MTU2MTY0MDA3N30.JVOG_G7oeDgZMKAaJEUysFkhNlzKQh1ABWrpzfV0XhQ",
                "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            },
        }).then(response => {
            setNews(response.data.results);
            setLoading(false);
            ScrollReveal().reveal('.body__card', { delay: 200, viewFactor: 0.8 });
        });
    }, []);

    return (
        <>  
            <div className="header">
                <div className="header__top">
                    <h3 onClick={handleReturnToHome}>Codelândia</h3>
                    <h4>blog</h4>
                </div>
                <div className="header__search">
                    <div className="header__imgsearch">
                        <img src={SearchImg} alt="Search"/>
                    </div>
                    <input 
                        className="header__input" 
                        placeholder="Pesquisar no blog"
                        onChange={event => setTextSearch(event.target.value)}
                        value={textSearch}
                    />
                </div>
            </div>

            {loading 
            
            ?
                <div className="loading">
                    <SyncLoader color={"#CE153B"} loading={loading} size={15} />
                    <h1>Carregando...</h1>
                    <span>Uma pessoa que nunca cometeu um erro, nunca tentou nada novo.</span>
                </div>
            :
                <>
                    {news.map((value, key) => {
                        return (
                            <div className="body__card" key={key}>
                                <div className="body__header">
                                    <p>{value.publishdatestring}</p>
                                    <img src={LikeImg} alt="like" onClick={handleLikeButton}/>
                                </div>
                                <br></br>
                                <div className="body__title">
                                    <h2>{value.title}</h2>
                                </div>
                                <div className="body__description">
                                    <p>{value.shortdescription}</p>
                                </div>
                            </div>
                        )
                    })}
                    <div className="separator">Fim das notícias</div>
                </>
            }

            <div className="space"/>
        </>
    );
}