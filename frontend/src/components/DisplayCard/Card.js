import styled from "styled-components";

const Card = ({ productDescription, productName, price_per_unit, productImg }) => {
	return (
		<Wrapper productImg={productImg}>
			<div className="bg" />
			<div className="body">
				<h4>Product Name: {productName}</h4>
				<footer>
					<p>Price: {price_per_unit}</p>
                    <p>Product Description: {productDescription}</p>
				</footer>
			</div>
		</Wrapper>
	);
};


// adding add cart button
const handleButtonAddCart = e => {
    e.preventDefault()
    props.addToCart(props.product.id, variantInfo)
}

<Button fluid className='add-button' onClick={handleButtonAddCart}>
    Add to Cart
    <Icon name='arrow right' />
</Button>

const Wrapper = styled.div`
	border-radius: 7px;	
	box-shadow: -2px 7px 8px 3px rgba(204, 204, 204, 0.63);
	width: 15rem;
	
	& > .bg {
		background: url(${(props) => props.productImg}) no-repeat center center/cover;
		height: 10rem;
	}
	h4 {
			text-align: center;
		}
	& .body {
		flex-direction: column;
		align-items: center;
		padding: 0.5rem 0 1rem;
		display: flex;
		footer {
			margin-top: 0.7rem;
			& p {
				font-size: 0.9rem;
			}
		}
	}
`;

export default Card;


