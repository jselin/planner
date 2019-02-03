import calculateDemand from './calculateDemand';

const plan1 = {
  finished_lenght_m: 1.0,
  headings_hems_lenght_m: 0.1,
  fringe_lenght_m: 0.1,
  loom_waste_lenght_m: 0.1,
  lenght_shrinkage_p: 5,
  lenght_take_up_p: 5,
  finished_width_cm: 100,
  cutting_margin_m: 0.1,
  width_shrinkage_p: 5,
  width_draw_in_p: 5,
  selvedge_warps: 2,
  test_piece_lenght_m: 0.2,
  number_of_test_pieces: 1,
  number_of_designs: 1,
  picks_per_cm: 100,
  ends_per_cm: 100,
  warp_yarn_tex: 1,
  weft_yarn_tex: 1,
}

const result1 = {
  number_of_ends: 11025,
  number_of_pics: 17378,
  warp_demand_g: 20,
  warp_lenght_m: 1.74,
  warp_width_cm: 110.3,
  weft_demand_g: 16,
}

const plan2 = {
  // Design
  finished_lenght_m: 9,
  headings_hems_lenght_m: 0,
  lenght_shrinkage_p: 0,
  fringe_lenght_m: 0,
  finished_width_cm: 45,
  width_shrinkage_p: 0,
  number_of_designs: 1,

  // Weaving
  test_piece_lenght_m: 0,
  number_of_test_pieces: 0,
  loom_waste_lenght_m: 0,
  cutting_margin_m: 0,
  lenght_take_up_p: 0,
  width_draw_in_p: 0,
  selvedge_warps: 0,
  
  // Yarns
  warp_yarn_tex: 60,
  weft_yarn_tex: 60,
  picks_per_cm: 14,
  ends_per_cm: 14,
}

const result2 = {
  // On loom
  warp_lenght_m: 9,
  number_of_ends: 630,
  warp_width_cm: 45,
  number_of_pics: 12600,
 
  // Demand
  warp_demand_g: 341,
  weft_demand_g: 341,
}

const plan3 = {
  // Design
  finished_lenght_m: 1,
  headings_hems_lenght_m: 0,
  lenght_shrinkage_p: 0,
  fringe_lenght_m: 0,
  finished_width_cm: 100,
  width_shrinkage_p: 0,
  number_of_designs: 1,

  // Weaving
  test_piece_lenght_m: 0,
  number_of_test_pieces: 0,
  loom_waste_lenght_m: 0,
  cutting_margin_m: 0,
  lenght_take_up_p: 0,
  width_draw_in_p: 0,
  selvedge_warps: 0,
  
  // Yarns
  warp_yarn_tex: 24,
  weft_yarn_tex: 24,
  picks_per_cm: 20,
  ends_per_cm: 20,
}

const result3 = {
  // On loom
  warp_lenght_m: 1,
  number_of_ends: 2000,
  warp_width_cm: 100,
  number_of_pics: 2000,
 
  // Demand
  warp_demand_g: 48,
  weft_demand_g: 48,
}


it('calculateDemand', () => {
  expect(calculateDemand(plan1)).toEqual(result1);
  expect(calculateDemand(plan2)).toEqual(result2);
  expect(calculateDemand(plan3)).toEqual(result3);
})
