
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
        description: string,
        publishedAt: string,
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
        axios.get('https://newsapi.org/v2/top-headlines?country=br&apiKey=9c24c765b67b48eab01b0dea9682e85f').then(response => {
            setNews(response.data.articles);
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
                    <SyncLoader color={"#CE153B"} loading={loading} size={16} />
                    <h1>Carregando...</h1>
                    <span>Uma pessoa que nunca cometeu um erro, nunca tentou nada novo.</span>
                </div>
            :
                <>
                    {news.map((value, key) => {
                        return (
                            <div className="body__card">
                                <div className="body__header">
                                    <p key={key}>{value.publishedAt}</p>
                                    <img src={LikeImg} alt="like" onClick={handleLikeButton}/>
                                </div>
                                <br></br>
                                <div className="body__title">
                                    <h2 key={key}>{value.title}</h2>
                                </div>
                                <div className="body__description">
                                    <p key={key}>{value.description}</p>
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