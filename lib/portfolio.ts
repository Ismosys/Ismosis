export type Category = 'mechanical' | 'aerospace' | 'medical' | 'industrial';

export type PortfolioItem = {
  id: string;
  title: string;
  figure: string;
  category: Category;
  type: 'Utility' | 'Design' | 'Provisional';
  src: string;
  description: string;
  application: string;
  views: string;
  method: string;
  delivery: string;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'quadruped-body',
    title: 'Quadruped Robotic Platform',
    figure: 'FIG. 1',
    category: 'mechanical',
    type: 'Utility',
    src: '/portfolio/quadruped-body.png',
    description:
      'Perspective view of a four-legged robotic platform with articulated leg assemblies, modular battery compartment, and removable head-mounted sensor pod. Drafted from CAD reference for the primary disclosure figure.',
    application: 'Robotics / Mobility',
    views: 'Single perspective',
    method: 'CAD to line art',
    delivery: 'PDF + PNG',
  },
  {
    id: 'quadruped-sensor',
    title: 'Quadruped Sensor Array Detail',
    figure: 'FIG. 1A',
    category: 'mechanical',
    type: 'Utility',
    src: '/portfolio/quadruped-sensor.png',
    description:
      'Magnified detail callout of the spine-mounted sensor strip, paired with the parent quadruped figure. Detail boundary uses a dashed circular leader to a phantom enlargement, a standard USPTO convention for inset views.',
    application: 'Robotics / Sensors',
    views: 'Perspective with detail enlargement',
    method: 'CAD to line art',
    delivery: 'PDF + PNG',
  },
  {
    id: 'planetary-rover',
    title: 'Six Wheel Planetary Rover',
    figure: 'FIG. 2',
    category: 'aerospace',
    type: 'Utility',
    src: '/portfolio/planetary-rover.png',
    description:
      'Three orientations of a six-wheel mobile rover with rocker-bogie suspension, mast-mounted instrumentation, and arm assembly. Comparative views establish proportions across the disclosure on a single sheet.',
    application: 'Aerospace / Mobility',
    views: 'Three perspective orientations',
    method: 'Reference photographs to line art',
    delivery: 'PDF + PNG',
  },
  {
    id: 'launch-vehicle',
    title: 'Multi Stage Launch Vehicle',
    figure: 'FIG. 3',
    category: 'aerospace',
    type: 'Utility',
    src: '/portfolio/launch-vehicle.png',
    description:
      'Isometric figure of a multi-stage launch vehicle accompanied by two orthographic engine cluster views. The lower figures resolve nozzle arrangement that is otherwise occluded in the perspective.',
    application: 'Aerospace / Propulsion',
    views: 'One perspective, two orthographic',
    method: 'Sketch to line art',
    delivery: 'PDF + PNG',
  },
  {
    id: 'toroidal-coil',
    title: 'Toroidal Containment Coil',
    figure: 'FIG. 4',
    category: 'industrial',
    type: 'Utility',
    src: '/portfolio/toroidal-coil.png',
    description:
      'Cross-sectional perspective of a toroidal coil structure showing layered winding bands and internal channel geometry. Drawn to emphasize the curvature continuity required by the claim language.',
    application: 'Industrial / Energy',
    views: 'Cross-sectional perspective',
    method: 'CAD to line art',
    delivery: 'PDF + PNG',
  },
  {
    id: 'bearing-assembly',
    title: 'Roller Bearing Cutaway',
    figure: 'FIG. 5',
    category: 'mechanical',
    type: 'Utility',
    src: '/portfolio/bearing-assembly.png',
    description:
      'Cutaway figure of a roller bearing assembly with eight numbered callouts identifying the inner race, roller cage, outer race, sealing lip, and lubrication channel. Hatching follows standard sectional convention.',
    application: 'Mechanical / Power Transmission',
    views: 'Sectional perspective',
    method: 'CAD to line art',
    delivery: 'PDF + PNG',
  },
  {
    id: 'turbine-housing',
    title: 'Turbine Housing Cutaway',
    figure: 'FIG. 6',
    category: 'industrial',
    type: 'Utility',
    src: '/portfolio/turbine-housing.png',
    description:
      'Cutaway perspective of a turbine housing showing internal rotor assembly, blade arrangement, and exhaust transition to the support frame. Drawn to retain operative geometry while suppressing non claimed surfaces.',
    application: 'Industrial / Turbomachinery',
    views: 'Cutaway perspective',
    method: 'CAD to line art',
    delivery: 'PDF + PNG',
  },
  {
    id: 'torso-brace',
    title: 'Upper Body Support Brace',
    figure: 'FIG. 7',
    category: 'medical',
    type: 'Utility',
    src: '/portfolio/torso-brace.png',
    description:
      'Worn position figure of an upper body brace with paired shoulder caps, anterior support panels, and adjustable abdominal strap. Reference numerals run from 10 through 43, matched to the specification claim language.',
    application: 'Medical / Orthotics',
    views: 'Worn perspective with callouts',
    method: 'Reference photograph to line art',
    delivery: 'PDF + PNG',
  },
  {
    id: 'orthopedic-footwear',
    title: 'Orthopedic Footwear System',
    figure: 'FIG. 23',
    category: 'medical',
    type: 'Utility',
    src: '/portfolio/orthopedic-footwear.png',
    description:
      'Four position study of an orthopedic shoe with adjustable strap mechanism, captured during donning and worn states. Sheet groups FIG. 23 A and B with two supporting perspectives to show the strap path.',
    application: 'Medical / Orthotics',
    views: 'Four perspective positions',
    method: 'Reference photograph to line art',
    delivery: 'PDF + PNG',
  },
  {
    id: 'orthopedic-sandal',
    title: 'Orthopedic Sandal Detail',
    figure: 'FIG. 24',
    category: 'medical',
    type: 'Utility',
    src: '/portfolio/orthopedic-sandal.png',
    description:
      'Worn perspective figure of an orthopedic sandal with detachable strap, sole tongue, and forward retention loop. Reference numerals identify each strap component used in the method claims.',
    application: 'Medical / Orthotics',
    views: 'Worn perspective with callouts',
    method: 'Reference photograph to line art',
    delivery: 'PDF + PNG',
  },
];
