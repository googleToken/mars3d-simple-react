import React from "react";
import {render} from "react-dom";
import RouteMap from "./router/routeMap";
import {LocaleProvider} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";


render(
		<LocaleProvider locale={zh_CN}>
			<RouteMap/>
		</LocaleProvider>,
	document.getElementById("root")
);


