import { getCategories } from "@/lib/newt";
import LabelButton from "./LabelButton";

interface Props {
  selectedSlug?: string | undefined;
}

interface PropsIsSelected {
  selectedSlug?: string | undefined;
  slug?: string | undefined;
}

const isSelected = ({ selectedSlug, slug }: PropsIsSelected) => {
  if (selectedSlug == slug) {
    return true;
  }
};

const CategoryLabelList = async (props: Props) => {
  const categories = await getCategories();

  return (
    <div className="mb-4 md:mb-8">
      <ul className="flex flex-wrap gap-x-2">
        <li>
          <LabelButton
            href="/"
            title="すべて"
            size="large"
            selected={isSelected({
              selectedSlug: props.selectedSlug,
              slug: undefined,
            })}
          />
        </li>
        {categories.map((category) => {
          return (
            <li key={category._id}>
              <LabelButton
                href={`/articles/category/${category.slug}`}
                title={category.title}
                size="large"
                selected={isSelected({
                  selectedSlug: props.selectedSlug,
                  slug: category.slug,
                })}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryLabelList;
