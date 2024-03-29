import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Page, Section } from "components/Page";
import { RingSpinner } from "react-spinners-kit";
import { createSession } from "ducks/session";
import useAsyncEffect from "utils/useAsyncEffect";
import { notice, alert } from "utils/notifications";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const MagicLink = () => {
	const token = useQuery().get("token");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const sleep = (m) => new Promise((r) => setTimeout(r, m));

	useAsyncEffect(async () => {
		try {
			await dispatch(createSession({ token }));
			await sleep(1200);
			notice({ message: "You are now logged in!" });
			navigate("/user-settings");
		} catch (e) {
			alert({ message: e.errors[0]?.message });
			await sleep(1200);
			navigate("/login");
		}
	}, []);

	return (
		<Page>
			<Section center>
				<div className="window">
					<RingSpinner size={100} color="#201335" />
				</div>
			</Section>
		</Page>
	);
};

export default MagicLink;
