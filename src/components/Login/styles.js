import styled, { css, keyframes } from 'styled-components'

const scale = keyframes`
  
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }

`
export const Wrapper = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: #0d141fde;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 3;
`

export const Container = styled.div`
	border-radius: 3px;
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	max-width: 480px;

	background: #141f30;
	display: flex;
	flex-direction: column;
	animation: ${scale} 0.3s both ease-in;
`

export const Form = styled.form`
	padding: 40px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: space-evenly;
`

export const SelectionGroup = styled.div`
	display: flex;
`

export const Selection = styled.button`
	outline: none;
	font-size: 18px;
	letter-spacing: 1.6px;
	padding: 30px;
	background: #19293d;
	color: #677996;
	border: none;
	flex-grow: 1;

	${props =>
		props.active &&
		`

      background: transparent;
      color: #FFF;
    `};
`
export const InputField = styled.div`
	position: relative;
`
export const SubHeader = styled.p`
	font-size: 14px;
	letter-spacing: 1.2px;
	color: #677998;
	text-align: center;
	margin: 0 0 20px;
`

export const Cancel = styled.button`
	font-size: 14px;
	letter-spacing: 1.2px;
	color: #677998;
	padding-left: 0;
	padding-right: 0;
	border: none;
	border-bottom: 1px solid #677998;
	background: transparent;
	align-self: flex-end;
	margin-left: 35px;
	&:hover {
		color: #b7c6e1;
	}
`
