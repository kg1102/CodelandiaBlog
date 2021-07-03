
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
        axios.get('https://content.sbt.com.br/api/notices?limit=10&idregional=0&idgender=15&orderby=publishdate&sort=desc', {
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
                "access-control-allow-origin": "*",
                "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNidC1zaXRlLXByb2QiLCJlbmRwb2ludHMiOlsiKiJdLCJob3N0cyI6WyJodHRwOi8vd3d3LXByb2QudHZzYnQuY29tLmJyIiwiaHR0cDovL3d3dy5zYnQuY29tLmJyIiwiaHR0cHM6Ly93d3cuc2J0LmNvbS5iciIsImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJzZXJ2aWNlcyI6WyIqIl0sImlhdCI6MTU1MzU2MTI5MX0.6GBkl1U9CWUQfXYLPJDl5NLrIVolkcG5eJTKFDGZQEY",
                "if-none-match": "W/\"aa17-Fq6pNHLlOKvP17Aiu8hBZnyNcjE\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1"
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
                                    <p>{value.publishedAt}</p>
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