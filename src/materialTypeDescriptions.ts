// Material type descriptions mapping
export const materialTypeDescriptions: Record<string, Record<string, string>> = {
  steel: {
    Pipe: 'Steel pipes are used for transporting fluids and gases, and for structural applications. They are strong, durable, and available in various diameters and thicknesses.',
    Rod: 'Steel rods are solid cylindrical bars used in construction, fabrication, and reinforcement. They provide high tensile strength.',
    Beam: 'Steel beams are structural elements used to support loads in buildings and bridges. Common types include I-beams and H-beams.',
    Angle: 'Steel angles are L-shaped sections used for framing, supports, and brackets in construction and fabrication.',
    Sheet: 'Steel sheets are thin, flat pieces used for roofing, cladding, and fabrication. They are available in various thicknesses.',
    Plate: 'Steel plates are thick, flat pieces used for heavy-duty structural and fabrication applications.',
    Channel: 'Steel channels are U-shaped sections used for structural support, framing, and tracks.',
    Rebar: 'Steel rebar is used to reinforce concrete structures, providing tensile strength and durability.',
  },
  aluminum: {
    Pipe: 'Aluminum pipes are lightweight, corrosion-resistant, and used for plumbing, HVAC, and structural applications.',
    Rod: 'Aluminum rods are solid bars used in fabrication, machining, and construction.',
    Sheet: 'Aluminum sheets are thin, flat pieces used for roofing, cladding, and lightweight fabrication.',
    Plate: 'Aluminum plates are thick, flat pieces used for structural and industrial applications.',
    Channel: 'Aluminum channels are U-shaped sections used for framing and lightweight structural support.',
  },
  concrete: {
    Beam: 'Concrete beams are used as structural elements in buildings and bridges, providing compressive strength.',
    Block: 'Concrete blocks are used for building walls and foundations, offering strength and durability.',
  },
  stainless: {
    Pipe: 'Stainless steel pipes are corrosion-resistant and used for transporting fluids, food processing, and structural applications.',
    Rod: 'Stainless steel rods are solid bars used in fabrication, machining, and construction where corrosion resistance is needed.',
    Sheet: 'Stainless steel sheets are thin, flat pieces used for cladding, kitchen equipment, and fabrication.',
    Plate: 'Stainless steel plates are thick, flat pieces used for heavy-duty and corrosion-resistant applications.',
    Channel: 'Stainless steel channels are U-shaped sections used for structural support and framing in corrosive environments.',
  },
  copper: {
    Pipe: 'Copper pipes are widely used for plumbing and HVAC due to their excellent thermal and electrical conductivity.',
    Rod: 'Copper rods are solid bars used in electrical applications and fabrication.',
    Sheet: 'Copper sheets are thin, flat pieces used for roofing, cladding, and artistic work.',
    Plate: 'Copper plates are thick, flat pieces used for industrial and electrical applications.',
    Channel: 'Copper channels are used for electrical and structural applications.',
    Wire: 'Copper wire is used for electrical wiring due to its high conductivity.',
  },
  plastic: {
    Pipe: 'Plastic pipes are lightweight, corrosion-resistant, and used for plumbing, irrigation, and drainage.',
    Sheet: 'Plastic sheets are thin, flat pieces used for cladding, insulation, and lightweight fabrication.',
    Rod: 'Plastic rods are solid bars used in machining, fabrication, and construction.',
    Block: 'Plastic blocks are used for machining and fabrication of custom parts.',
  },
};
