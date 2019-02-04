
/*
Length shrinkage (m) = (Length + Headings/Hems) / 100 x Length shrinkage (%)										
Width shrinkage (cm) = Width / 100 x Width shrinkage (%)										

Length take-up (m) =  ((Length + Headings/Hems + Length shringage (m) + Fringes) x Number of designs + Test Peace x Number of test pieces + Loom waste + Cutting Margin) / 100 x Length take up (%)										


Width draw-in (cm) = (Width + Width shrinkage (cm)) / 100 * Width draw-in (%)										
Fabric lenght (m) = (Lenght + Headings/Hems + Lenght shrinkage (m)) x Number of designs + Length of Test Piece x Number of test pieces + Length take-up (m)										
										
Warp length (m) = (Length + Headings/Hems + Length shringage (m) + Fringes) x Number of designs + Length of Test Piece x Number of test pieces + Loom waste + Cutting Margin + Length take-up (m)										

Warp width (m) = Width + Width shrinkage (cm) + Width draw-in (cm)										
Number of ends = Warp width (cm) x Ends per cm										

Number of picks = Warp length (m) x 100 x Picks per cm										
										
Warp demand (g) = Ends per cm x Warp width (cm) x Warp lenght (m) x Yarn TEX number / 1000 										

Weft demand (g) = Picks per cm tiheys x Warp width (cm) x Fabric length (m) x Yarn TEX number /1000										
*/

function calculateDemand(d) {
  let length_shrinkage_m =
    (d.finished_lenght_m + d.headings_hems_lenght_m) *
    (d.lenght_shrinkage_p / 100);

  let width_shrinkage_cm = d.finished_width_cm *
    (d.width_shrinkage_p / 100);

  let length_take_up_m =
    ((d.finished_lenght_m + d.headings_hems_lenght_m +
      length_shrinkage_m + d.fringe_lenght_m) * d.number_of_designs + (d.test_piece_lenght_m * d.number_of_test_pieces) +
      d.loom_waste_lenght_m + d.cutting_margin_m) *
    (d.lenght_take_up_p / 100);

  let width_draw_in_cm = (d.finished_width_cm + width_shrinkage_cm) *
    (d.width_draw_in_p / 100);

  let fabric_lenght_m =
    (d.finished_lenght_m + d.headings_hems_lenght_m + length_shrinkage_m) *
    d.number_of_designs + d.test_piece_lenght_m *
    d.number_of_test_pieces + length_take_up_m;

  let warp_lenght_m = ((d.finished_lenght_m + d.headings_hems_lenght_m +
    length_shrinkage_m + d.fringe_lenght_m) *
    d.number_of_designs + (d.test_piece_lenght_m * d.number_of_test_pieces) +
    d.loom_waste_lenght_m + d.cutting_margin_m + length_take_up_m);

  let warp_width_cm = d.finished_width_cm + width_shrinkage_cm +
    width_draw_in_cm

  let number_of_ends = warp_width_cm * d.ends_per_cm;

  let number_of_pics = warp_lenght_m * (d.picks_per_cm * 100);

  let warp_demand_g = d.ends_per_cm * warp_width_cm *
    warp_lenght_m * (d.warp_yarn_tex / 1000);

  let weft_demand_g = d.picks_per_cm * warp_width_cm *
    fabric_lenght_m * (d.weft_yarn_tex / 1000);

  return {
    warp_lenght_m: toTwoDecimals(warp_lenght_m),
    warp_width_cm: toOneDecimal(warp_width_cm),
    number_of_ends: Math.ceil(number_of_ends),
    number_of_pics: Math.ceil(number_of_pics),
    warp_demand_g: Math.ceil(warp_demand_g),
    weft_demand_g: Math.ceil(weft_demand_g),
  }
}

const toTwoDecimals = (d) => {
  return Math.round(d * 100) / 100;
}

const toOneDecimal = (d) => {
  return Math.round(d * 10) / 10;
}

export default calculateDemand;