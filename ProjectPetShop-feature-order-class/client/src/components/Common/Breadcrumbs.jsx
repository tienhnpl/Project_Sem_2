import React,{memo} from 'react'
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";




const Breadcrumbs = ({ title, category, subcategories }) => {
  const routes = [
    { path: "/", breadcrumb: "Home" },
    { path: "/:category", breadcrumb: category },
    // Kiểm tra nếu subcategories tồn tại thì mới thêm route
    ...(subcategories
      ? [{ path: "/:category/:subcategory", breadcrumb: subcategories }]
      : []),
    { path: "/:category/:subcategory/:pid/:title", breadcrumb: title },
  ];
    
    const breadcrumb = useBreadcrumbs(routes)
  return (
    <div className='text-sm flex items-center gap-1'>
  {breadcrumb?.filter(el => !el.match.route === false).map(({ match, breadcrumb }, index, self) => (
    <Link className='flex items-center hover:text-bg-user gap-1' key={match.pathname} to={match.pathname}>
      <span className='capitalize'>{breadcrumb}</span> 
      {index !== self.length -1 && <IoIosArrowForward/>}
    </Link>
  ))}
</div>

  )
}

export default memo(Breadcrumbs)
