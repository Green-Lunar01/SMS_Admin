import { useState } from 'react';
import type { Subscription } from '../../pages/Subscription';

const PlanCard = ({
  onSave,
  onDelete,
  data
}: {
  onSave: (data: Subscription) => void;
  onDelete: (data: Subscription['id']) => void;
  data: Subscription;
}) => {
  const [features, setFeatures] = useState<string[]>(data.features || ['']);
  const [formData, setFormData] = useState({
    id: data.id || '',
    name: data.name || '',
    price: Number(data.price) || 0,
    duration: data.duration || ''
  });

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleFeatureChange = (value: string, index: number) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'price' ? Number(value) : value
    });
  };

  const handleSave = () => {
    const dataToSave = { ...formData, features };
    onSave(dataToSave);
  };
  const handleDelete = () => {
    onDelete(formData.id);
  };

  const onFeatureDelete = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };
  return (
    <div className="border px-3 pt-4 pb-6 rounded-md w-full md:w-[40%] lg:w-[25%] text-sm">
      <div className="flex justify-between items-end">
        <button type="button" className="w-5" onClick={handleDelete}>
          <img src="/delete-icon.svg" alt="delete icon" className="w-full" />
        </button>

        <button type="button" className="text-primary-light" onClick={handleSave}>
          Save
        </button>
      </div>

      <form className="w-full mt-5 flex flex-col gap-5">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Plan Name"
          className="w-full rounded-md placeholder:text-xs placeholder:text-black outline-primary-light p-3 bg-[#FBFBFB]"
        />

        <div className="flex gap-3 items-center justify-between">
          <input
            type="number"
            name="price"
            value={formData.price === 0 ? '' : formData.price}
            onChange={handleInputChange}
            placeholder="Plan Price"
            className="w-[50%] rounded-md placeholder:text-xs placeholder:text-black outline-primary-light p-3 bg-[#FBFBFB]"
          />

          <select
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-[50%] p-3 bg-[#FBFBFB] rounded-md outline-primary-light"
          >
            <option value="perMonth">month</option>
            <option value="perAnnum">year</option>
          </select>
        </div>

        {features.map((feature, index) => (
          <div className="flex items-center gap-3" key={index}>
            <input
              key={index}
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(e.target.value, index)}
              placeholder={`Feature ${index + 1}`}
              className="w-full rounded-md placeholder:text-xs placeholder:text-black outline-primary-light p-3 bg-[#FBFBFB]"
            />

            <button type="button" className="w-5" onClick={() => onFeatureDelete(index)}>
              <img src="/delete-icon.svg" alt="delete icon" className="w-full" />
            </button>
          </div>
        ))}

        <button
          type="button"
          className="w-fit hover:scale-105 duration-300 transition-all"
          onClick={handleAddFeature}
        >
          <img src="/add-circle.svg" alt="Add Feature" />
        </button>
      </form>
    </div>
  );
};

export default PlanCard;
