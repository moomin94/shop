import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components'

function Detail(props) {

  let { id } = useParams();
  const result = props.shoes.find(item => item.id == id);
  let [count, setCount] = useState(0);
  let [saleAlert, setSaleAlert] = useState(true);

  useEffect(() => {
    let a = setTimeout(() => { setSaleAlert(false) }, 2000)
    // 대충 서버로 데이터 요청하는 코드 (2초 소요)
    return () => {
      // useEffect 동작 전에 실행되는 코드
      // 2초 사이에 재렌더링 되어버리면?? 여러 번의 요청을 막아주는 역할
      // ex) 기존 타이머(기존 데이터 요청)는 제거해주세요~~
      clearTimeout(a)
    }
  }, [])

  /*
    4. useEffect 실행 전에 뭔가 실행하려면 언제나 { } 안에 return () => {}
    useEffect(()=>{}) 1. 재렌더링마다 코드 실행하고 싶으면
    useEffect(()=>{}, []) 2. mount시 1회 코드 실행하고 싶으면
    useEffect(() => {
      return () => {
        3. unmount시 1회 코드실행하고 싶으면
      }
    )
    useEffect(()=>{}, [count]) 5. 특정 state 변경시에만 실행하려면 [state명]
  */

  let [num, setNum] = useState('');

  useEffect(() => {
    if (isNaN(num) == true) { alert('숫자를 입력해주세요') }
  }, [num])
  return (
    <div className="container">
      {saleAlert ? <div className="alert alert-warning">2초 이내 구매 시 할인</div> : null}
      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes" + (Number(id) + 1) + ".jpg"} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{result.title}</h4>
          <p>{result.content}</p>
          <p>{result.price}원</p>
          <form style={{ marginBottom: '20px' }}>
            <input type="text" onChange={(e) => { setNum(e.target.value) }} />
          </form>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div >
  )
}

export default Detail;