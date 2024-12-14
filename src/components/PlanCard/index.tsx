import { useState } from 'react';

const PlanCard = ({ onSave }: { onSave: (data: any) => void }) => {
  const [features, setFeatures] = useState<string[]>(['']);
  const [formData, setFormData] = useState({
    planName: '',
    planPrice: '',
    billingCycle: 'month'
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const dataToSave = { ...formData, features };
    onSave(dataToSave);
  };

  return (
    <div className="border px-3 pt-4 pb-6 rounded-md w-[25%] text-sm">
      <div className="flex justify-end items-end">
        <button type="button" className="text-primary-light" onClick={handleSave}>
          Save
        </button>
      </div>

      <form className="w-full mt-5 flex flex-col gap-5">
        <input
          type="text"
          name="planName"
          value={formData.planName}
          onChange={handleInputChange}
          placeholder="Plan Name"
          className="w-full rounded-md placeholder:text-xs placeholder:text-black outline-primary-light p-3 bg-[#FBFBFB]"
        />

        <div className="flex gap-3 items-center justify-between">
          <input
            type="number"
            name="planPrice"
            value={formData.planPrice}
            onChange={handleInputChange}
            placeholder="Plan Price"
            className="w-[50%] rounded-md placeholder:text-xs placeholder:text-black outline-primary-light p-3 bg-[#FBFBFB]"
          />

          <select
            name="billingCycle"
            value={formData.billingCycle}
            onChange={handleInputChange}
            className="w-[50%] p-3 bg-[#FBFBFB] rounded-md outline-primary-light"
          >
            <option value="month">month</option>
            <option value="year">year</option>
          </select>
        </div>

        {features.map((feature, index) => (
          <input
            key={index}
            type="text"
            value={feature}
            onChange={(e) => handleFeatureChange(e.target.value, index)}
            placeholder={`Feature ${index + 1}`}
            className="w-full rounded-md placeholder:text-xs placeholder:text-black outline-primary-light p-3 bg-[#FBFBFB]"
          />
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
