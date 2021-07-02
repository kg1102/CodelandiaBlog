
import { useHistory } from 'react-router-dom';
import '../assets/styles/App.scss';
import SearchImg from '../assets/images/search.svg';
import LikeImg from '../assets/images/like.svg';

export default function App(){

    let history = useHistory();

    function handleLikeButton(){
        alert('Voce deu laiker');
    }

    function handleReturnToHome(){
        history.push("/");
    }

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
                    <input className="header__input" placeholder="Pesquisar no blog"></input>
                </div>
            </div>
            <div className="body__card">
                <div className="body__header">
                    <p>03 de jul, 2021</p>
                    <img src={LikeImg} alt="like" onClick={handleLikeButton}/>
                </div>
                <br></br>
                <div className="body__title">
                    <h2>Windows 11 é oficialmente anunciado pela Microsoft</h2>
                </div>
                <div className="body__description">
                    <p>A Microsoft lançou nesta quinta-feira (24) o aguardado Windows 11. A nova geração do sistema operacional para computadores já havia sido alvo de uma série de rumores e vazamentos nas últimas semanas. A build do SO, inclusive, ficou disponível para download por alguns dias, antes de a empresa derrubar as páginas.</p>
                </div>
            </div> 
            <div className="body__card">
                <div className="body__header">
                    <p>02 de jul, 2021</p>
                    <img src={LikeImg} alt="like" onClick={handleLikeButton}/>
                </div>
                <br></br>
                <div className="body__title">
                    <h2>Tim Berners-Lee vai leiloar código-fonte da web</h2>
                </div>
                <div className="body__description">
                    <p>Código-fonte original da Web é vendido em NFT por quase R$ 27 milhões. O código original da Web foi vendido como um token não fungível (NFT) nesta quarta-feira (30). O cientista e físico britânico Tim Berners-Lee, também conhecido como “Pai da Web”, leiloou o documento por US$ 5,4 milhões — cerca de R$ 27 milhões.</p>
                </div>
            </div> 
            <div className="body__card">
                <div className="body__header">
                    <p>02 de jul, 2021</p>
                    <img src={LikeImg} alt="like" onClick={handleLikeButton}/>
                </div>
                <br></br>
                <div className="body__title">
                    <h2>John McAfee, criador do antivírus McAfee, morre</h2>
                </div>
                <div className="body__description">
                    <p>O empresário John McAfee, de 75 anos, foi encontrado morto numa prisão em Barcelona. Figura polêmica, ele era investigado por fraude fiscal.</p>
                </div>
            </div>
            <br></br><br></br><br></br><br></br><br></br>
        </>
    );
}