import React from 'react';
import { hydrate } from 'react-dom';
import SimilarApp from './components/SimilarApp';
import LikeApp from './components/LikeApp';

let id = Math.floor(Math.random() * 10000000) + 1;

hydrate(<SimilarApp id={id}/>, document.getElementById('similar'));
hydrate(<LikeApp id={id}/>, document.getElementById('youMayLike'));