import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Loading = styled.div`
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`

export const Container = styled.div`
	max-width: 700px;
	background-color: #fff;
	border-radius: 4px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
	padding: 30px;
	margin: 80px auto;
`
export const BackButton = styled(Link)`
	border: 0;
	outline: 0;
	background: transparent;
	transition: 0.5s;

	&:hover {
		opacity: 0.6;
	}
`

export const Owner = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;

	img {
		width: 150px;
		border-radius: 20%;
		margin: 20px 0;
	}

	h1 {
		font-size: 30px;
		color: #0d2636;
	}

	p {
		margin-top: 5px;
		color: #000;
		text-align: center;
		line-height: 1.4;
		max-width: 400px;
	}
`

export const FilterList = styled.div`
	margin: 10px 0 !important;

	button {
		background-color: #0d2636;
		border: 0;
		outline: 0;
		color: #fff;
		border-radius: 4px;
		font-weight: 700;
		padding: 5px 7px;
		transition: 0.5s;

		& + button {
			margin-left: 5px;
		}

		&:nth-child(${(props) => props.active + 1}) {
			background-color: #0071db;
			cursor: default;
		}

		&:not(:nth-child(${(props) => props.active + 1})):hover {
			opacity: 0.6;
		}
	}
`

export const IssuesList = styled.ul`
	margin-top: 30px;
	padding-top: 30px;
	border-top: 1px solid #eee;
	list-style: none;

	li {
		display: flex;
		padding: 15px 10px;

		& + li {
			margin-top: 12px;
		}

		img {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			border: 2px solid #0d2636;
		}

		div {
			flex: 1;
			margin-left: 12px;

			p {
				font-size: 12px;
				color: #000;
			}
		}

		strong {
			font-style: 15px;

			a {
				text-decoration: none;
				color: #222;
				transition: 0.3s;

				&:hover {
					color: #0071db;
				}
			}
		}
	}
`

export const LabelList = styled.div`
	margin: 10px 0 !important;

	span {
		background-color: #222;
		color: #fff;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 600;
		padding: 5px 7px;

		& + span {
			margin-left: 5px;
		}
	}
`

export const PageActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	button {
		background: transparent;
		outline: 0;
		border: 0;
		border-radius: 50%;
		margin: 0 10px;
		transition: 0.5s;

		&:hover {
			opacity: 0.6;
		}

		&:disabled {
			opacity: 0.6;
			cursor: default;
		}
	}
`
