import './about-myself.form.scss';
import React from 'react';
import {
	FormLayout,
	Button,
	Title,
	Div,
	Group,
	Textarea,
} from '@vkontakte/vkui';
import { AppState } from '../../store/app-state';
import { connect } from 'react-redux';
import { Validators } from '../../utils/validation/validators';

interface PropsFromState {
	onSave: (text: string) => void;
	btnText?: string;
	aboutMySelf: string;
}

interface PropsFromDispatch {}

type AllProps = PropsFromState & PropsFromDispatch;

interface State {
	aboutMyself: string;
	errors: any | null;
}

const maxValues = {
	maxAboutMyself: 84,
};

class AboutMyselfForm extends React.Component<AllProps, State> {
	constructor(props) {
		super(props);
		this.state = {
			aboutMyself: props.aboutMySelf ?? '',
			errors: {},
		};
		this.onClickNext = this.onClickNext.bind(this);
	}

	handleInputChange = (event) => {
		event.preventDefault();
		const { value } = event.target;
		this.setState({
			aboutMyself: value,
		});
		this.setState({
			errors: {
				...this.state.errors,
				aboutMyself:
					Validators.required(value) ||
					Validators.maxLength(value, maxValues.maxAboutMyself),
			},
		});
	};

	onClickNext = () => {
		if (!this.isValid()) return;
		const { onSave } = this.props;
		onSave(this.state.aboutMyself);
	};

	isValid() {
		this.setState({
			errors: {
				...this.state.errors,
				aboutMyself:
					Validators.required(this.state.aboutMyself) ||
					Validators.maxLength(
						this.state.aboutMyself,
						maxValues.maxAboutMyself,
					),
			},
		});

		let formIsValid = !this.state.errors.aboutMyself;
		return formIsValid;
	}

	render() {
		const { btnText } = this.props;
		const { errors, aboutMyself } = this.state;
		return (
			<Group>
				<Group className='about-myself-group' separator='hide'>
					<Div className='themes-form'>
						<Div>
							<Title level='3' weight='bold' className='title text-center'>
								Напишите о себе
							</Title>
						</Div>
						<FormLayout>
							<Textarea
								minLength={1}
								maxLength={maxValues.maxAboutMyself}
								placeholder='Введите текст'
								name='aboutMyself'
								top={
									<span className='flex-between'>
										О себе
										<span>{maxValues.maxAboutMyself - aboutMyself.length}</span>
									</span>
								}
								value={aboutMyself}
								onChange={this.handleInputChange}
								status={errors?.aboutMyself ? 'error' : 'default'}
								bottom={errors?.aboutMyself}
							></Textarea>
						</FormLayout>
					</Div>
				</Group>
				<Group separator='hide'>
					<Button className='btn-primary' size='xl' onClick={this.onClickNext}>
						{btnText ?? 'Далее'}
					</Button>
				</Group>
			</Group>
		);
	}
}

const mapStateToProps = ({ authentication }: AppState) => ({
	aboutMySelf: authentication.currentUser?.aboutMySelf,
});

const mapDispatchToProps: PropsFromDispatch = {};

export default connect(mapStateToProps, mapDispatchToProps)(AboutMyselfForm);
