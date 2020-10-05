import React, { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from "./components/NewsCards/NewsCards";
import { Typography } from "@material-ui/core";
import wordsToNumber from 'words-to-numbers';

const KEY = '4adb4f7ee1d39e3581419a9abc40e6772e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {
    const [news, SetNews] = useState([])
    const [activeArticle, setActiveArticle] = useState(-1);

    useEffect(() => {
        alanBtn({
            key: KEY,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    SetNews(articles);
                    setActiveArticle(-1)
                } else if (command === 'highlight') {
                    setActiveArticle(prevActiveArticle => prevActiveArticle + 1);
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumber(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
                    if (parsedNumber > 20) {
                        alanBtn().playText('Please try again.')
                    } else if (article) {
                        window(article.url, '_blank')
                        alanBtn().playText('Okay, sure')
                    }
                }
            },
        })
    }, []);

    return (
        <div>
            <Typography variant='h2' color='primary' align='center'>Newsvoice</Typography>
            <NewsCards articles={news} activeArticle={activeArticle} />
        </div>
    )
}

export default App
