import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Page } from "components/Page";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { signupRequest } from "api";
import { notice, alert } from "utils/notifications";
import Tooltip from "components/Tooltip";

export default function Signup() {
	const navigate = useNavigate();
	const session = useSelector((state) => state.session);

	useEffect(() => {
		if (session) {
			navigate("/user-settings");
		}
	}, [session, navigate]);

	const [emailSent, setEmailSent] = useState(false);

	const handleSubmit = useCallback(
		async (values) => {
			try {
				const newValues = {
					...values,
					company: values.company || null,
					allow_list: values.allow_list
						? values.allow_list.split(",").map((e) => e.trim())
						: [],
				};

				await signupRequest(newValues);
				setEmailSent(true);
				notice({ message: "Check your inbox to login!" });
			} catch (error) {
				if (error?.errors?.some((e) => e.code === "USER_REGISTERED")) {
					notice({ message: "User already registered!" });
					navigate("/login");
				} else {
					alert({
						message: error?.errors[0]?.message,
					});
					throw error;
				}
			}
		},
		[navigate, setEmailSent],
	);

	const initialValues = {
		email: "",
		name: "",
		company: "",
		tech: "",
		allow_list: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email address").required("Required"),
		name: Yup.string().required("Required"),
		company: Yup.string().max(30, "Must be 20 characters or less"),
		allow_list: Yup.string(),
		tech: Yup.string().required("Required"),
	});

	return (
		<Page>
			<section className="section">
				<p className="header__title">
					Register for free{" "}
					<div>
						<span className="space__right-1" aria-label="like" role="img">
							👍
						</span>
						<span className="space__right-1" aria-label="clap" role="img">
							👏
						</span>
						<span className="space__right-1" aria-label="Soon" role="img">
							🔜
						</span>
						<span className="space__right-1" aria-label="Laptop" role="img">
							💻
						</span>
					</div>
				</p>
				<div className="window">
					<div className="window__text">
						We will email you a Magic Link. Click on it to login! If you cannot
						find the login email, check in the promotions tab or spam.
					</div>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						validateOnBlur={true}
						className="form"
					>
						{(props) => (
							<Form className="form">
								<div className="form__row">
									<label htmlFor="email">Email*:</label>
									<Field
										id="email"
										name="email"
										type="email"
										placeholder="myemail@example.com"
										disabled={emailSent}
										onBlur={props.handleBlur}
									/>
								</div>
								{props.touched.email && props.errors.email && (
									<div className="form__errors">{props.errors.email}</div>
								)}
								<div className="form__row">
									<label htmlFor="name">Name*: </label>
									<Field
										id="name"
										name="name"
										type="text"
										disabled={emailSent}
										onBlur={props.handleBlur}
									/>
								</div>
								{props.touched.name && props.errors.name && (
									<div className="form__errors">{props.errors.name}</div>
								)}
								<div className="form__row">
									<label htmlFor="company">Company: </label>
									<Field
										id="company"
										name="company"
										type="text"
										onBlur={props.handleBlur}
										disabled={emailSent}
									/>
								</div>
								{props.touched.company && props.errors.company && (
									<div className="form__errors">{props.errors.company}</div>
								)}
								<div className="form__row">
									<label htmlFor="allow_list">Allowed websites: </label>
									<Tooltip
										id="allow-list"
										message="Accept only requests coming from these domains. If left blank, accept requests from all domains. Separate domains with a comma"
									/>
									<Field
										id="allow_list"
										name="allow_list"
										type="text"
										placeholder="https://hello.com, https://hello.it"
										onBlur={props.handleBlur}
										disabled={emailSent}
									/>
								</div>
								{props.touched.allow_list && props.errors.allow_list && (
									<div className="form__errors">{props.errors.allow_list}</div>
								)}
								<div className="form__row">
									<label htmlFor="tech">Tech*:</label>
									<Field
										type="text"
										name="tech"
										id="tech"
										as="select"
										onBlur={props.handleBlur}
										disabled={emailSent}
									>
										<option value="">Choose one</option>
										<option value="react">ReactJS</option>
										<option value="next">Next.js</option>
										<option value="gatsby">Gatsby</option>
										<option value="notion">Notion</option>
										<option value="html">HTML + JS</option>
										<option value="blogger">Blogger</option>
										<option value="wordpress">Wordpress</option>
										<option value="webflow">Webflow</option>
										<option value="VueJS">VueJS</option>
										<option value="other_ssg">
											Other static site generator
										</option>
										<option value="ssaf">
											Server side application framework
										</option>
										<option value="idk">I don't know :)</option>
										<option value="other">Other</option>
									</Field>
								</div>
								{props.touched.tech && props.errors.tech && (
									<div className="form__errors">{props.errors.tech}</div>
								)}
								<div className="center space__top-4">
									<button type="submit" className="button" disabled={emailSent}>
										Register!
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</section>
		</Page>
	);
}
