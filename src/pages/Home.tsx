
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
        publishedAt: string
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
        axios.get('https://api.mediastack.com/v1/news?access_key=2918d6b36db943a130970d697aa6dfec&countries=br', {
            headers: {
                'referer': 'http://localhost',
                'host':"localhost",
                'origin': 'http://localhost/',
            }
        }).then(response => {
            setNews(response.data.data);
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
                                    <p>{value.publishedAt}</p>
                                    <img src={LikeImg} alt="like" onClick={handleLikeButton}/>
                                </div>
                                <br></br>
                                <div className="body__title">
                                    <h2>{value.title}</h2>
                                </div>
                                <div className="body__description">
                                    <p>{value.description}</p>
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