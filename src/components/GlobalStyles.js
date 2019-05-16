import styled from 'styled-components'

export const Button = styled.button`
	outline: none;
	flex-grow: ${props => (props.small ? '0' : '1')};
	font-size: ${props => (props.small ? '14px' : '16px')};
	letter-spacing: ${props => (props.small ? '1.4px' : '1.6px')};
	padding: ${props => (props.small ? '5px 10px' : '10px 30px')};
	margin-top: ${props => (props.small ? '0px' : '25px')};
	margin-left: ${props => (props.spaced ? '25px' : '0px')};
	color: ${props => (props.small && props.purple ? '#fff' : props.small ? '#677998' : '#fff')};
	border: ${props => (props.small || props.purple ? '1px solid #677998' : '1px solid #59f8e8')};
	align-self: center;
	border-radius: 3px;
	background: ${props => (props.purple ? '#1625379e' : props.full ? '#59f8e8' : 'transparent')};

	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

	&:hover {
		box-shadow: 0 5px 28px rgba(0, 0, 0, 0.25), 0 5px 10px rgba(0, 0, 0, 0.22);
		background: ${props => (props.purple ? '#1625379e' : '#3f979c')};
		border-color: ${props => (props.purple ? '#677998' : '#3f979c')};
	}
`

export const Input = styled.input`
	padding: 5px 10px;
	margin: ${props => (props.spaced ? '10px 0' : '0')};
	color: #fff;
	font-size: 16px;
	background: transparent;
	border: none;
	border-bottom: 1px solid #40a0a2;
	outline: none;
	transition: all 0.3s ease;
	letter-spacing: 1.6px;
	&:focus {
		border-bottom: 1px solid #59f8e8;
	}
	&:-webkit-autofill {
		background-color: transparent;
	}
	&::-webkit-input-placeholder {
		color: #677996;
	}
`

export const FlexContainer = styled.div`
	display: flex;
	align-items: center;
`