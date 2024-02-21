const html = `<Accordion onlyOne={true} id="test">
<CollapseCard onToggle={onClick} id="id1">
  <CollapseCard.Header>
    Header 1
  </CollapseCard.Header>
  <CollapseCard.Body>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
Laborum debitis nesciunt fugiat in facilis enim. Eaque perferendis obcaecati, adipisci nobis blanditiis reiciendis 
soluta odio voluptatibus natus a impedit tenetur dolor!</p>
  </CollapseCard.Body>
</CollapseCard>

<CollapseCard onToggle={onClick} id="id2">
  <CollapseCard.Header>
    Header 2
  </CollapseCard.Header>
  <CollapseCard.Body>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
Laborum debitis nesciunt fugiat in facilis enim. Eaque perferendis obcaecati, adipisci nobis blanditiis reiciendis 
soluta odio voluptatibus natus a impedit tenetur dolor!</p>
  </CollapseCard.Body>
</CollapseCard>

<CollapseCard onToggle={onClick} id="id3">
  <CollapseCard.Header>
    Header 3
  </CollapseCard.Header>
  <CollapseCard.Body>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
Laborum debitis nesciunt fugiat in facilis enim. Eaque perferendis obcaecati, adipisci nobis blanditiis reiciendis 
soluta odio voluptatibus natus a impedit tenetur dolor!</p>
  </CollapseCard.Body>
</CollapseCard>

</Accordion>`;

export default html;
