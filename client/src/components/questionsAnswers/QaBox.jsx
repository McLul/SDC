import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchBar from './SearchBar.jsx';
import QAWrapper from './QAWrapper.jsx';

function QaBox({ id }) {
  const [questions, setQuestions] = useState([]);
  const [secondPass, setSecondPass] = useState(false);
  const [doubleCheckNextPage, setDoubleCheckNextPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
    isPageDone: false,
    isQuestionModalOpen: false,
  });

  useEffect(() => {
    setProductMetadata({
      product_id: id,
      productName: '',
    });
    setDoubleCheckNextPage(false);
    setQuestions([]);
    setSecondPass(false);
    setSearchTerm('');
    setIndexes({
      page: 1,
      questionIndex: 0,
    });
    setChecks({
      isLoading: true,
      isDone: false,
      isPageDone: false,
      isQuestionModalOpen: false,
    });

    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`, {
      headers: {
        Authorization: process.env.GITKEY,
      },
    })
      .then(({ data }) => {
        setProductMetadata({ productName: data.name, product_id: data.id });
      });
  }, [id]);

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${productMetadata.product_id}`, {
      headers: {
        Authorization: process.env.GITKEY,
      },
      params: {
        page: indexes.page,
      },
    })
      .then(({ data }) => {
        setQuestions([...questions, ...data.results]);

        if (data.results.length === 0) {
          if (!doubleCheckNextPage) {
            setDoubleCheckNextPage(true);
            setIndexes({ ...indexes, page: indexes.page + 1 });
          } else {
            setDoubleCheckNextPage(false);
            setChecks({ ...checks, isPageDone: true });
          }
        }

        if (questions.length < 2 && !secondPass) {
          setSecondPass(true);
          setIndexes({ ...indexes, page: indexes.page + 1 });
        } else if (secondPass && questions.length <= 2) {
          setSecondPass(false);
          setChecks({ ...checks, isPageDone: true });
        }
        setChecks({ ...checks, isLoading: false });
      });
  }, [indexes.page]);

  // useEffect(() => {
  //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${productMetadata.product_id}`, {
  //     headers: {
  //       Authorization: process.env.GITKEY,
  //     }
  //   })
  //     .then(({ data }) => {
  //       console.log(data.name);
  //       setProductMetadata({ ...productMetadata, productName: data.name });
  //     });
  // }, [id]);

  function handleMoreQuestions() {
    document.querySelector('#bottom').scrollIntoView(false);

    if (!checks.isPageDone) {
      setIndexes({ ...indexes, page: indexes.page++ });
    }

    if (questions.length - 3 > indexes.questionIndex) {
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
    <Wrapper>
      <h2>Questions And Answers</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <QAWrapper
        questions={questions}
        setQuestions={setQuestions}
        productMetadata={productMetadata}
        questionIndex={indexes.questionIndex}
        searchTerm={searchTerm}
        checks={checks}
        setChecks={setChecks}
      />

      {!checks.isDone
        && (<button type="button" onClick={() => handleMoreQuestions()} disabled={checks.isLoading} className="QAButton">More Questions</button>)}
      <button type="button" disabled={checks.isLoading} onClick={() => handleAddQuestion()} className="QAButton">Add a Question</button>
    </Wrapper>
  );
}

export default QaBox;

const Wrapper = styled.div`
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin: 50px auto 0 auto;
  padding-bottom: 4rem;
  width: 70%;

  @media (max-width: 500px) {
    margin: 25px 0 0 0;
    width: 100%;
    padding: 5px;
  }

  & h2 {
    margin: 1.25rem 0;
  }

  & .QAButton {
    text-transform: uppercase;
    font-weight: 700;
    padding: 1rem 5rem;
    background: none;
    border: 1px solid #222;
    margin-right: 10px;
    &:hover {
      color: #eee;
      background: #222;
    }
    &:disabled {
      background: grey;
      color: white;
      opacity: 0.25;
    }
  }

`;
