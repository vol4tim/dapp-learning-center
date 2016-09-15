import React, { PropTypes } from 'react'
import FormLearning from '../../containers/formLearning'
import FormCheck from '../../containers/formCheck'
import Result from './result'
import Step from './step'

const Main = (props) => {
  const { name } = props

  return (<div>
    <h1>Урок {props.number}: {name}</h1>
    {props.isExecute ?
      <Result><p>Урок выполнен</p></Result>
      :
      <div>
        <ul className="nav nav-tabs nav-justified">
          <li role="presentation" className="active">
            <a href="#tab1" role="tab" data-toggle="tab">
              Выполнение урока
            </a>
          </li>
          <li role="presentation">
            <a href="#tab2" role="tab" data-toggle="tab">Проверка умений</a>
          </li>
        </ul>
        <div className="tab-content">
          <div role="tabpanel" className="tab-pane active" id="tab1" style={{ paddingTop: 20 }}>
            <div className="row">
              <div className="col-xs-4">
                <div className="list-group">
                {props.progress.map((item, index) => <Step key={index} {...item} />)}
                </div>
              </div>
              <div className="col-xs-8">
                <FormLearning form={'FormLearning' + props.number} number={props.number} />
                {props.formResult.status === 1 &&
                  <Result>
                    <p dangerouslySetInnerHTML={{ __html: props.formResult.message }} />
                  </Result>
                }
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="tab2" style={{ paddingTop: 20 }}>
            <FormCheck form={'FormCheck' + props.number} number={props.number} />
            {props.formCheckResult.status === 1 &&
              <Result><p>Урок выполнен успешно</p></Result>
            }
            {props.formCheckResult.status === 2 &&
              <Result><p>Урок не выполнен</p></Result>
            }
          </div>
        </div>
      </div>
    }
  </div>)
}

Main.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default Main
