import React from "react";
// import Cesium from "cesium";

import "./cesiumContainer.less";
import { getMapConfig, getPoint } from "../../map/api";
import { createMap } from "../../map/main";

class AppMap extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			mapDivId: "mapView",
			mainMap: null,
			postInit: true,
			activeNav: "",
			activePage: "综合信息"
		};
	}

	componentDidMount() {
		getMapConfig().then(data => {
			var viewer = createMap(this.state.mapDivId, data);
			window.viewer = viewer; //绑定到全局 

			this.addPointToMap(viewer);
		});
	}

	componentWillUnmount() {

	}

	componentDidUpdate() {
		console.log("component did update!");
	}


	//添加点数据  示例
	addPointToMap(viewer) {
		getPoint().then(data => {
			var dataSource = new Cesium.CustomDataSource();
			viewer.dataSources.add(dataSource);

			for (var item of data.Data) {
				var position = Cesium.Cartesian3.fromDegrees(item.JD, item.WD, 2);

				//添加实体
				var entity = dataSource.entities.add({
					name: item.JC,
					position: position,
					point: {
						//像素点
						color: new Cesium.Color.fromCssColorString("#3388ff"),
						pixelSize: 10,
						outlineColor: new Cesium.Color.fromCssColorString("#ffffff"),
						outlineWidth: 2,
						scaleByDistance: new Cesium.NearFarScalar(1000, 1, 1000000, 0.1)
					},
					label: {
						text: item.JC,
						font: "16px 楷体",
						style: Cesium.LabelStyle.FILL_AND_OUTLINE,
						fillColor: Cesium.Color.AZURE,
						outlineColor: Cesium.Color.BLACK,
						outlineWidth: 2,
						horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
						verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
						pixelOffset: new Cesium.Cartesian2(0, -10), //偏移量
						distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
							0.0,
							200000
						)
					},
					data: item,
					popup: mars3d.util.getPopup("all", item, "企业点"),
					click: function (entity) {
						//单击回调
						haoutil.msg("您单击了：" + entity.data.JC);
					}
				});
			}
		});
	}



	render() {
		let mapStyle = { height: "100%", width: "100%" };
		return (
			<React.Fragment>
				<div id="cesiumContainer" className="itemContainer bg-gis collapsed">
					<div id={this.state.mapDivId} style={mapStyle} className="appmap"></div>
				</div>
			</React.Fragment>
		);
	}
}

export default AppMap;