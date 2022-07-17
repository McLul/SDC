import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchBar from './SearchBar.jsx';
import QAWrapper from './QAWrapper.jsx';

function QaBox({ id }) {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [count, setCount] = useState(0);
  const [indexes, setIndexes] = useState({
    page: 1,
    questionIndex: 0,
  });
  const [productMetadata, setProductMetadata] = useState({
    product_id: id,
    productName: '',
  });
  const [checks, setChecks] = useState({
    isLoading: true,
    isDone: false,
    isQuestionModalOpen: false,
  });
  const [isPageDone, setIsPageDone] = useState(false);

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`, {
      headers: {
        Authorization: process.env.GITKEY,
      },
    })
      .then(({ data }) => {
        setQuestions([]);
        setIndexes({
          page: 1,
          questionIndex: 0,
        });
        setIsPageDone(false);
        setSearchTerm('');
        setChecks({
          isLoading: true,
          isDone: false,
          isQuestionModalOpen: false,
        });
        setCount(0);
        setProductMetadata({ productName: data.name, product_id: data.id });
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${id}`, {
      headers: {
        Authorization: process.env.GITKEY,
      },
      params: {
        page: indexes.page,
      },
    })
      .then(({ data }) => {
        if (data.results.length === 0 && !isPageDone) {
          setCount(count + 1);
          if (count >= 7) {
            setIsPageDone(true);
          } else if ((count < 7 && !isPageDone) || data.results.length === 1) {
            setIndexes({ ...indexes, page: indexes.page + 1 });
          }
        } else {
          const freshData = [...questions, ...data.results];

          const uniq = [];
          const qsWithoutDups = freshData.filter((el) => {
            const duplicate = uniq.includes(el.question_id);
            if (!duplicate) {
              uniq.push(el.question_id);
              return true;
            }
            return false;
          });
          setQuestions(qsWithoutDups);

          if (questions.length < 2 && !isPageDone) {
            setIndexes({ ...indexes, page: indexes.page + 1 });
          }
        }
        setChecks({ ...checks, isLoading: false });
      })
      .catch((err) => console.error(err));
  }, [indexes.page]);

  useEffect(() => {
    document.querySelector('.qa-wrapper')?.scrollTo({ top: document.querySelector('.qa-wrapper').scrollHeight, behavior: 'smooth' });
  }, [indexes.questionIndex]);

  function handleMoreQuestions() {
    if (!isPageDone) {
      setIndexes({ ...indexes, page: indexes.page++ });
    }

    if (questions.length - 1 > indexes.questionIndex) {
      setIndexes({ ...indexes, questionIndex: indexes.questionIndex + 2 });
    } else {
      setIndexes({ ...indexes, questionIndex: indexes.questionIndex + 1 });
      setChecks({ ...checks, isDone: true });
    }
  }

  function handleAddQuestion() {
    setChecks({ ...checks, isQuestionModalOpen: !checks.isQuestionModalOpen });
  }

  return (
    <Wrapper data-testid="qa-component">
      <h2 className="qa-component-header">Questions And Answers</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <QAWrapper
        questions={questions}
        setQuestions={setQuestions}
        productMetadata={productMetadata}
        questionIndex={indexes.questionIndex}
        searchTerm={searchTerm}
        checks={checks}
        setChecks={setChecks}
        page={indexes.page}
      />
      <PrimaryBtnGroup>
        {!checks.isDone
          && (<button type="button" onClick={() => handleMoreQuestions()} disabled={checks.isLoading} className="QAButton">More Questions</button>)}
        <button type="button" disabled={checks.isLoading} onClick={() => handleAddQuestion()} className="QAButton" data-testid="qa-addqbtn">Add a Question</button>
      </PrimaryBtnGroup>
    </Wrapper>
  );
}

export default QaBox;

const Wrapper = styled.div`
  isolation: isolate;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 50px auto 0 auto;
  padding-bottom: 4rem;
  width: 50%;
  @media (max-width: 500px) {
    margin: 25px 0 0 0;
    width: 100%;
    padding: 15px;
  }

  & .qa-component-header {
    margin: 1.25rem 0;

    @media(max-width:500px) {
      width: 100%;
      text-align: center;
      padding: 0 10px;
    }
  }
`;


const PrimaryBtnGroup = styled.div`
  display: flex;

  & .QAButton {
    height: 3rem;
    padding: 0 1rem;
    justify-content: flex-start;
    text-transform: uppercase;
    font-weight: 700;
    background: none;
    border: 1px solid #222;
    margin-right: 10px;
    margin-top: 15px;
    &:hover {
      color: #eee;
      background: #222;
    }
    &:disabled {
      background: grey;
      color: white;
      opacity: 0.25;
    }

    @media(max-width: 500px) {
      flex: 1;
      padding: 0;
      height: 5rem;
    }
  }
  @media(max-width: 500px) {
    justify-content: space-between;
  }
`;
